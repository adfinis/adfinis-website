import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  CLICK_ID_COOKIE,
  CLICK_ID_MAX_AGE,
  readClickIdFromUrl,
  serializeClickId,
} from "@/lib/click-id"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"

export async function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost || request.headers.get("host")
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https"
  const hasWww = host?.startsWith("www.")
  const wwwRedirectEnabled = process.env.WWW_REDIRECT === "true"

  let response: NextResponse

  if (!hasWww && wwwRedirectEnabled) {
    const newUrl = new URL(request.url)
    newUrl.protocol = forwardedProto
    newUrl.host = process.env!.ABSOLUTE_URL!.replace("https://", "")
    newUrl.port = ""

    response = NextResponse.redirect(newUrl, 301)
  } else {
    response = NextResponse.next()
  }

  response.headers.set("Strict-Transport-Security", "max-age=63072000;")

  const clickId = readClickIdFromUrl(request.nextUrl.searchParams)
  const consent = request.cookies.get(COOKIE_CONSENT_KEY)?.value

  if (clickId && consent !== "functional") {
    response.cookies.set(CLICK_ID_COOKIE, serializeClickId(clickId), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: CLICK_ID_MAX_AGE,
    })
    // next.config.mjs puts "public, s-maxage=60" on every HTML response, so a
    // shared cache could otherwise replay this Set-Cookie and attribute one
    // visitor's ad click to the next.
    response.headers.set("Cache-Control", "private, no-store")
  } else if (consent === "functional" && request.cookies.has(CLICK_ID_COOKIE)) {
    response.cookies.delete(CLICK_ID_COOKIE)
    response.headers.set("Cache-Control", "private, no-store")
  }

  if (request.cookies.has("__prerender_bypass")) {
    response.headers.set("Cache-Control", "private, no-store")
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
