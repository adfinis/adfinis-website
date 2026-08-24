import "server-only"

export interface LinkedInCapiConfig {
  capiUrl: string
  apiVersion: string
  enabled: boolean
  accessToken: string
  conversionId: string
  debug: boolean
}

export interface LinkedInConversionInput {
  eventId: string
  email?: string
  liFatId?: string
  eventAt?: Date
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const normalizeEmail = (v: string) => v.trim().toLowerCase()

export class LinkedInCapiTracker {
  private readonly config: LinkedInCapiConfig

  constructor(config: LinkedInCapiConfig) {
    this.config = config
  }

  async trackConversion(input: LinkedInConversionInput): Promise<void> {
    if (
      !this.config.enabled ||
      this.config.accessToken === "" ||
      this.config.conversionId === ""
    ) {
      return
    }

    const userIds: Array<{ idType: string; idValue: string }> = []
    if (input.email) {
      userIds.push({
        idType: "SHA256_EMAIL",
        idValue: await sha256Hex(normalizeEmail(input.email)),
      })
    }
    if (input.liFatId) {
      userIds.push({
        idType: "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID",
        idValue: input.liFatId,
      })
    }
    // Without any user identifier LinkedIn cannot match the conversion.
    if (userIds.length === 0) return

    const payload = {
      conversion: `urn:lla:llaPartnerConversion:${this.config.conversionId}`,
      conversionHappenedAt: (input.eventAt ?? new Date()).getTime(),
      eventId: input.eventId,
      user: { userIds },
    }

    if (this.config.debug) {
      console.log("🔍 [LinkedIn CAPI Debug]", JSON.stringify(payload))
    }

    try {
      const response = await fetch(this.config.capiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
          "Content-Type": "application/json",
          "LinkedIn-Version": this.config.apiVersion,
          "X-Restli-Protocol-Version": "2.0.0",
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok && this.config.debug) {
        console.warn(`LinkedIn CAPI tracking failed: ${response.status}`)
      }
    } catch (error) {
      if (this.config.debug) {
        console.error("LinkedIn CAPI tracking error:", error)
      }
    }
  }
}

const config: LinkedInCapiConfig = {
  capiUrl:
    process.env.LINKEDIN_CAPI_URL ||
    "https://api.linkedin.com/rest/conversionEvents",
  apiVersion: process.env.LINKEDIN_API_VERSION || "202501",
  enabled: process.env.LINKEDIN_ENABLE_TRACKING === "true",
  accessToken: process.env.LINKEDIN_CAPI_ACCESS_TOKEN || "",
  conversionId: process.env.LINKEDIN_CONVERSION_ID || "",
  debug: process.env.LINKEDIN_DEBUG_TRACKING === "true",
}

export const linkedinCapi = new LinkedInCapiTracker(config)

export { config as linkedinCapiConfig }
