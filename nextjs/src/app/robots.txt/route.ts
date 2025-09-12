import { NextResponse } from "next/server"

export function GET() {
  const isProduction = process.env.NODE_ENV === "production"

  const content = isProduction
    ? `User-agent: *
Allow: /`
    : `User-agent: *
Disallow: /`

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
