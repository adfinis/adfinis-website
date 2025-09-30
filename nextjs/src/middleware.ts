import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost || request.headers.get("host")
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https"
  const hasWww = host?.startsWith("www.")
  const wwwRedirectEnabled = process.env.WWW_REDIRECT === "true"

  let response: NextResponse

  if (!hasWww && wwwRedirectEnabled) {
    const newUrl = new URL(request.url)
    newUrl.protocol = forwardedProto
    newUrl.host = process.env.ABSOLUTE_URL!.replace("https://", "")
    console.log(newUrl.host, process.env.ABSOLUTE_URL)
    response = NextResponse.redirect(newUrl, 301)
  } else {
    response = NextResponse.next()
  }

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  )

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
