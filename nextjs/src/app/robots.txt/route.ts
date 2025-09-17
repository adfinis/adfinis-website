import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export function GET() {
  const isProduction = process.env.NODE_ENV === "production"

  const content = isProduction
    ? `User-agent: *
Allow: /`
    : `User-agent: *
Disallow: /

Sitemap: ${ABSOLUTE_URL}/sitemap.xml
`

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
