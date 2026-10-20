import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function basicAuthChallenge(request: NextRequest) {
  const user = process.env.BASIC_AUTH_USER
  const password = process.env.BASIC_AUTH_PASSWORD

  if (!user || !password) {
    return null
  }

  const header = request.headers.get("authorization")

  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6))
      const separator = decoded.indexOf(":")
      const providedUser = decoded.slice(0, separator)
      const providedPassword = decoded.slice(separator + 1)

      if (providedUser === user && providedPassword === password) {
        return null
      }
    } catch {
      // A malformed header is simply an unauthenticated request.
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Staging", charset="UTF-8"',
      "Cache-Control": "private, no-store",
    },
  })
}
