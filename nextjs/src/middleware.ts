import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")
  const forwardedHost = request.headers.get("x-forwarded-host")
  const useHost = forwardedHost || request.headers.get("host")
  const proto = request.headers.get("x-forwarded-proto")

  console.log({ host, forwardedHost, useHost, nextUrl: request.nextUrl, proto })

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
