import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export function GET() {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-pages.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-partner-products.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-case-studies.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-solutions.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-news.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${ABSOLUTE_URL}/sitemap-events.xml</loc>
    <lastmod>2025-09-12T12:07:26.917Z</lastmod>
  </sitemap>
</sitemapindex>
`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  )
}
