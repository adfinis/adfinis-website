import "server-only"

export interface RedditCapiConfig {
  capiUrl: string
  enabled: boolean
  accessToken: string
  accountId: string
  testMode: boolean
  debug: boolean
}

export interface RedditLeadInput {
  conversionId: string
  email?: string
  phone?: string
  ipAddress?: string
  userAgent?: string
  rdtUuid?: string
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
const normalizePhone = (v: string) => v.replace(/[^0-9]/g, "")

export class RedditCapiTracker {
  private readonly config: RedditCapiConfig

  constructor(config: RedditCapiConfig) {
    this.config = config
  }

  async trackLead(input: RedditLeadInput): Promise<void> {
    if (!this.config.enabled || this.config.accessToken === "") {
      return
    }

    const user: Record<string, string> = {}
    if (input.email) user.email = await sha256Hex(normalizeEmail(input.email))
    if (input.phone) {
      const digits = normalizePhone(input.phone)
      if (digits) user.phone_number = await sha256Hex(digits)
    }
    if (input.ipAddress) user.ip_address = input.ipAddress
    if (input.userAgent) user.user_agent = input.userAgent
    if (input.rdtUuid) user.uuid = input.rdtUuid

    const payload = {
      test_mode: this.config.testMode,
      events: [
        {
          event_at: (input.eventAt ?? new Date()).toISOString(),
          event_type: { tracking_type: "Lead" },
          user,
          event_metadata: { conversion_id: input.conversionId },
        },
      ],
    }

    if (this.config.debug) {
      console.log("🔍 [Reddit CAPI Debug]", JSON.stringify(payload))
    }

    try {
      const url = `${this.config.capiUrl}${this.config.accountId}`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok && this.config.debug) {
        const body = await response.text()
        console.warn(
          `Reddit CAPI tracking failed: ${response.status} ${body}`,
        )
      }
    } catch (error) {
      if (this.config.debug) {
        console.error("Reddit CAPI tracking error:", error)
      }
    }
  }
}

const config: RedditCapiConfig = {
  capiUrl: process.env.REDDIT_CAPI_URL || "",
  enabled: process.env.REDDIT_ENABLE_TRACKING === "true",
  accessToken: process.env.REDDIT_CAPI_ACCESS_TOKEN || "",
  accountId: process.env.REDDIT_CAPI_ACCOUNT_ID || "",
  testMode: process.env.REDDIT_TEST_MODE === "true",
  debug: process.env.REDDIT_DEBUG_TRACKING === "true",
}

export const redditCapi = new RedditCapiTracker(config)

export { config as redditCapiConfig }
