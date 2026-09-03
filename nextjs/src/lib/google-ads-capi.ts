import "server-only"
import type { ClickId } from "@/lib/click-id"

export interface GoogleAdsCapiConfig {
  ingestUrl: string
  tokenUrl: string
  serviceAccountEmail: string
  serviceAccountKey: string
  customerId: string
  conversionActionId: string
  enabled: boolean
  debug: boolean
}

export interface GoogleAdsConversionInput {
  transactionId: string
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

const DATA_MANAGER_SCOPE = "https://www.googleapis.com/auth/datamanager"

function base64Url(data: ArrayBuffer | string) {
  const bytes =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : new Uint8Array(data)
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function pemToDer(pem: string) {
  const body = pem
    .replace(/-----BEGIN [A-Z ]+-----/, "")
    .replace(/-----END [A-Z ]+-----/, "")
    .replace(/\s+/g, "")
  return Buffer.from(body, "base64")
}

export async function signServiceAccountJwt(
  email: string,
  privateKeyPem: string,
  audience: string,
  now = new Date(),
) {
  const issuedAt = Math.floor(now.getTime() / 1000)
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claims = base64Url(
    JSON.stringify({
      iss: email,
      scope: DATA_MANAGER_SCOPE,
      aud: audience,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  )
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${header}.${claims}`),
  )
  return `${header}.${claims}.${base64Url(signature)}`
}

export function parseServiceAccountJson(raw: string | undefined) {
  if (!raw) return { email: "", key: "" }
  try {
    const parsed = JSON.parse(raw) as {
      client_email?: unknown
      private_key?: unknown
    }
    return {
      email: typeof parsed.client_email === "string" ? parsed.client_email : "",
      key: typeof parsed.private_key === "string" ? parsed.private_key : "",
    }
  } catch {
    console.error("GOOGLE_ADS_SERVICE_ACCOUNT_JSON is not valid JSON")
    return { email: "", key: "" }
  }
}

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
      this.config.serviceAccountEmail === "" ||
      this.config.serviceAccountKey === "" ||
      this.config.customerId === "" ||
      this.config.conversionActionId === ""
    ) {
      return
    }

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
      eventSource: "WEB",
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
          productDestinationId: this.config.conversionActionId,
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
      const assertion = await signServiceAccountJwt(
        this.config.serviceAccountEmail,
        this.config.serviceAccountKey,
        this.config.tokenUrl,
      )
      const response = await fetch(this.config.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion,
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

const serviceAccount = parseServiceAccountJson(
  process.env.GOOGLE_ADS_SERVICE_ACCOUNT_JSON,
)

const config: GoogleAdsCapiConfig = {
  ingestUrl:
    process.env.GOOGLE_ADS_DATA_MANAGER_URL ||
    "https://datamanager.googleapis.com/v1/events:ingest",
  tokenUrl:
    process.env.GOOGLE_ADS_OAUTH_TOKEN_URL ||
    "https://oauth2.googleapis.com/token",
  serviceAccountEmail: serviceAccount.email,
  serviceAccountKey: serviceAccount.key,
  customerId: (process.env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, ""),
  conversionActionId: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID || "",
  enabled: process.env.GOOGLE_ADS_ENABLE_TRACKING === "true",
  debug: process.env.GOOGLE_ADS_DEBUG_TRACKING === "true",
}

export const googleAdsCapi = new GoogleAdsCapiTracker(config)

export { config as googleAdsCapiConfig }
