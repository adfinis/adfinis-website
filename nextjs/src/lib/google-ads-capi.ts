import "server-only"
import type { ClickId } from "@/lib/click-id"

export interface GoogleAdsCapiConfig {
  ingestUrl: string
  tokenUrl: string
  clientId: string
  clientSecret: string
  refreshToken: string
  customerId: string
  conversionActionIds: Record<string, string>
  enabled: boolean
  debug: boolean
}

export interface GoogleAdsConversionInput {
  transactionId: string
  formType: string
  clickId?: ClickId
  email?: string
  phone?: string
  eventAt?: Date
}

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const normalizeEmail = (v: string) => v.trim().toLowerCase()

// Google matches phone numbers only in E.164. The form validator accepts a
// national format like "0791234567", and hashing that produces a digest that
// matches nothing, so anything without a country code is dropped instead.
function normalizePhone(value: string) {
  const trimmed = value.replace(/[\s()-]/g, "")
  return /^\+[0-9]{8,15}$/.test(trimmed) ? trimmed : undefined
}

export class GoogleAdsCapiTracker {
  private readonly config: GoogleAdsCapiConfig

  constructor(config: GoogleAdsCapiConfig) {
    this.config = config
  }

  async trackConversion(input: GoogleAdsConversionInput) {
    if (
      !this.config.enabled ||
      this.config.clientId === "" ||
      this.config.clientSecret === "" ||
      this.config.refreshToken === "" ||
      this.config.customerId === ""
    ) {
      return
    }

    const conversionActionId = this.config.conversionActionIds[input.formType]
    if (!conversionActionId) return

    if (!input.clickId) return

    const userIdentifiers: Array<Record<string, string>> = []
    if (input.email) {
      userIdentifiers.push({
        emailAddress: await sha256Hex(normalizeEmail(input.email)),
      })
    }
    if (input.phone) {
      const phone = normalizePhone(input.phone)
      if (phone) {
        userIdentifiers.push({ phoneNumber: await sha256Hex(phone) })
      }
    }
    const event: Record<string, unknown> = {
      transactionId: input.transactionId,
      eventTimestamp: (input.eventAt ?? new Date()).toISOString(),
      consent: {
        adUserData: "CONSENT_GRANTED",
        adPersonalization: "CONSENT_GRANTED",
      },
    }
    if (userIdentifiers.length > 0) event.userData = { userIdentifiers }
    if (input.clickId) {
      event.adIdentifiers = { [input.clickId.type]: input.clickId.value }
    }

    const payload = {
      destinations: [
        {
          operatingAccount: {
            accountType: "GOOGLE_ADS",
            accountId: this.config.customerId,
          },
          productDestinationId: conversionActionId,
        },
      ],
      events: [event],
      encoding: "HEX",
    }

    if (this.config.debug) {
      console.log("🔍 [Google Ads CAPI Debug]", JSON.stringify(payload))
    }

    const accessToken = await this.getAccessToken()
    if (!accessToken) return

    try {
      const response = await fetch(this.config.ingestUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const body = await response.text().catch(() => "")
        console.error(
          `Google Ads CAPI tracking failed: ${response.status} ${body}`,
        )
      }
    } catch (error) {
      console.error("Google Ads CAPI tracking error:", error)
    }
  }

  private async getAccessToken() {
    try {
      const response = await fetch(this.config.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
        }).toString(),
        cache: "no-store",
      })
      if (!response.ok) {
        const body = await response.text().catch(() => "")
        throw new Error(`${response.status} ${body}`)
      }
      const json = (await response.json()) as { access_token?: string }
      if (!json.access_token) throw new Error("no access_token in response")
      return json.access_token
    } catch (error) {
      console.error("Google Ads CAPI token exchange failed:", error)
      return undefined
    }
  }
}

const config: GoogleAdsCapiConfig = {
  ingestUrl:
    process.env.GOOGLE_ADS_DATA_MANAGER_URL ||
    "https://datamanager.googleapis.com/v1/events:ingest",
  tokenUrl:
    process.env.GOOGLE_ADS_OAUTH_TOKEN_URL ||
    "https://oauth2.googleapis.com/token",
  clientId: process.env.GOOGLE_ADS_OAUTH_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_ADS_OAUTH_CLIENT_SECRET || "",
  refreshToken: process.env.GOOGLE_ADS_OAUTH_REFRESH_TOKEN || "",
  customerId: (process.env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, ""),
  conversionActionIds: {
    short: process.env.GOOGLE_ADS_CONVERSION_ACTION_SHORT || "",
    standard: process.env.GOOGLE_ADS_CONVERSION_ACTION_STANDARD || "",
    contact: process.env.GOOGLE_ADS_CONVERSION_ACTION_CONTACT || "",
    event: process.env.GOOGLE_ADS_CONVERSION_ACTION_EVENT || "",
    raffle: process.env.GOOGLE_ADS_CONVERSION_ACTION_RAFFLE || "",
  },
  enabled: process.env.GOOGLE_ADS_ENABLE_TRACKING === "true",
  debug: process.env.GOOGLE_ADS_DEBUG_TRACKING === "true",
}

export const googleAdsCapi = new GoogleAdsCapiTracker(config)

export { config as googleAdsCapiConfig }
