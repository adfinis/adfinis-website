import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { matomo, shouldTrack, generateVisitorId } from "@/lib/matomo"

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")
  const forwardedHost = request.headers.get("x-forwarded-host")
  const useHost = forwardedHost || request.headers.get("host")
  const proto = forwardedHost || request.headers.get("x-forwarded-proto")

  console.log({ host, forwardedHost, useHost, nextUrl: request.nextUrl, proto })

  const response = NextResponse.next()

  if (!shouldTrack(request)) {
    return response
  }

  try {
    const ip =
      request.ip ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent") || ""
    const language = request.headers.get("accept-language") || ""
    const referrer = request.headers.get("referer") || undefined
    const visitorId = await generateVisitorId(request)
    await matomo.trackPageView({
      url: request.url,
      title: `Page: ${request.nextUrl.pathname}`,
      referrer,
      visitorId,
      // visitorId: "a3f19c0e2b7d4f10",
      ip,
      userAgent,
      language: language.split(",")[0],
    })
  } catch (error) {
    console.error("Matomo tracking error in middleware:", error)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
