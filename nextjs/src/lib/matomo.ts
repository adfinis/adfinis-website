import { NextRequest } from "next/server"

export interface MatomoTrackingData {
  // Required parameters
  idsite: string | number
  rec: number

  // Page tracking
  url?: string
  action_name?: string
  urlref?: string

  // Visitor info
  _id?: string
  uid?: string
  cid?: string

  // Technical info
  res?: string
  h?: number
  m?: number
  s?: number
  ua?: string
  lang?: string
  cs?: string

  // Location
  cip?: string
  cdt?: string
  country?: string
  region?: string
  city?: string
  lat?: number
  long?: number

  // Events
  e_c?: string // Event category
  e_a?: string // Event action
  e_n?: string // Event name
  e_v?: number // Event value

  // Custom variables
  _cvar?: Record<string, [string, string]>
  cvar?: Record<string, [string, string]>

  // Performance
  pf_net?: number
  pf_srv?: number
  pf_tfr?: number
  pf_dm1?: number
  pf_dm2?: number
  pf_onl?: number
}

export interface MatomoConfig {
  siteId: string | number
  trackerUrl: string
  enabled: boolean
  debug?: boolean
}

class MatomoTracker {
  private readonly config: MatomoConfig

  constructor(config: MatomoConfig) {
    this.config = config
  }

  async track(data: Partial<MatomoTrackingData>): Promise<void> {
    if (!this.config.enabled) {
      return
    }

    if (this.config.debug) {
      console.log("🔍 [Matomo Debug]", data)
    }

    try {
      const trackingData: MatomoTrackingData = {
        idsite: this.config.siteId,
        rec: 1,
        ...data,
      }
      const params = new URLSearchParams()
      Object.entries(trackingData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "object") {
            params.append(key, JSON.stringify(value))
          } else {
            params.append(key, String(value))
          }
        }
      })
      const url = `${this.config.trackerUrl}/matomo.php?${params.toString()}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": data.ua || "NextJS-Server-Tracker/1.0",
        },
      })
      if (!response.ok && this.config.debug) {
        console.warn(`Matomo tracking failed: ${response.status}`)
      }
    } catch (error) {
      if (this.config.debug) {
        console.error("Matomo tracking error:", error)
      }
    }
  }

  /**
   * Track een pageview
   */
  async trackPageView(data: {
    url: string
    title?: string
    referrer?: string
    visitorId?: string
    ip?: string
    userAgent?: string
    language?: string
  }): Promise<void> {
    await this.track({
      url: data.url,
      action_name: data.title,
      urlref: data.referrer,
      _id: data.visitorId,
      // cip: data.ip,
      ua: data.userAgent,
      lang: data.language,
    })
  }
  async trackEvent(data: {
    category: string
    action: string
    name?: string
    value?: number
    url?: string
    visitorId?: string
    ip?: string
    userAgent?: string
  }): Promise<void> {
    await this.track({
      e_c: data.category,
      e_a: data.action,
      e_n: data.name,
      e_v: data.value,
      url: data.url,
      _id: data.visitorId,
      // cip: data.ip,
      ua: data.userAgent,
    })
  }
}

function getBrowserFingerprint(request: NextRequest) {
  const ip =
    request.ip ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  const userAgent = request.headers.get("user-agent") || ""
  const acceptEncoding = request.headers.get("accept-encoding") || ""
  const acceptLanguage = request.headers.get("accept-language") || ""
  const accept = request.headers.get("accept") || ""
  const secChUa = request.headers.get("sec-ch-ua") || ""
  const secChUaPlatform = request.headers.get("sec-ch-ua-platform") || ""
  const secChUaMobile = request.headers.get("sec-ch-ua-mobile") || ""
  return `${ip}${userAgent}${acceptLanguage}${acceptEncoding}${accept}${secChUa}${secChUaPlatform}${secChUaMobile}`
}

export async function generateVisitorId(request: NextRequest): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(getBrowserFingerprint(request))
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex.substring(0, 16)
}

export function shouldTrack(request: NextRequest): boolean {
  if (!config.enabled) {
    return false
  }

  const hostname = request.nextUrl.hostname
  const developmentHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"]
  const isLocalHost =
    developmentHosts.includes(hostname) ||
    hostname.startsWith("192.168.") ||
    hostname.endsWith(".local")
  if (isLocalHost && process.env.MATOMO_FORCE_TRACKING !== "true") {
    return false
  }

  const userAgent = request.headers.get("user-agent")?.toLowerCase() || ""
  const skipUserAgents = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "postman",
    "insomnia",
    "curl",
    "wget",
    "lighthouse",
    "pagespeed",
    "googlebot",
  ]

  if (skipUserAgents.some((agent) => userAgent.includes(agent))) {
    return false
  }

  return !(
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname === "/favicon.ico"
  )
}

const config: MatomoConfig = {
  siteId: process.env.MATOMO_SITE_ID || "1",
  trackerUrl: process.env.MATOMO_URL || "",
  enabled: process.env.MATOMO_ENABLE_TRACKING === "true",
  debug: process.env.MATOMO_DEBUG_TRACKING === "true",
}

export const matomo = new MatomoTracker(config)

export { config as matomoConfig }
