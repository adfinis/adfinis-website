import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import { Locale } from "@/lib/locale"

const STRAPI = process.env.STRAPI_API || ""

export const dynamic = "force-dynamic"

export async function GET() {
  const pages: { slug: any; lastmod: string; priority: undefined }[] = []

  const response = await fetch(
    `${STRAPI}/page-partner-and-products?populate[localizations][fields][0]=slug&populate[localizations][fields][1]=locale&fields[0]=slug&fields[1]=locale&pagination[pageSize]=1000`,
    {
      next: {
        revalidate: 15,
      },
    },
  )
  const { data } = await response.json()
  data.forEach((item: any) => {
    pages.push({
      slug: `${PARTNER_PRODUCTS_SLUGS["en"]}/${item.slug}`,
      lastmod: "2025-09-02T00:00:00+00:00",
      priority: undefined,
    })
    pages.push({
      slug: `${item.locale}/${PARTNER_PRODUCTS_SLUGS[item.locale as Locale]}/${item.slug}`,
      lastmod: "2025-09-02T00:00:00+00:00",
      priority: undefined,
    })
    item.localizations.forEach((related: any) => {
      pages.push({
        slug: `${related.locale.toLowerCase()}/${PARTNER_PRODUCTS_SLUGS[item.locale as Locale]}/${related.slug}`,
        lastmod: "2025-09-02T00:00:00+00:00",
        priority: undefined,
      })
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
      <url>
        <loc>${ABSOLUTE_URL}/${page.slug}</loc>
        <lastmod>${page.lastmod}</lastmod>
        ${page.priority !== undefined ? `<priority>${page.priority}</priority>` : ""}
      </url>`,
  )
  .join("\n")}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      // "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
