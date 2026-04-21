import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { locales } from "@/lib/locale"
import {
  type SitemapAlternate,
  buildContentEntries,
  renderSitemapXml, SitemapEntry
} from "@/lib/sitemap"

const STRAPI = process.env.STRAPI_API || ""

export const dynamic = "force-dynamic"

export async function GET() {
  const entries: SitemapEntry[] = []
  const homepageAlternates: SitemapAlternate[] = locales.map((locale) => ({
    locale,
    href: `${ABSOLUTE_URL}/${locale}`,
  }))

  entries.push({
    loc: `${ABSOLUTE_URL}/`,
    lastmod: "2025-09-02T00:00:00+00:00",
    priority: "1.0",
    alternates: homepageAlternates,
  })

  for (const locale of locales) {
    entries.push({
      loc: `${ABSOLUTE_URL}/${locale}`,
      lastmod: "2025-09-02T00:00:00+00:00",
      priority: "1.0",
      alternates: homepageAlternates,
    })
  }

  const response = await fetch(
    `${STRAPI}/pages?populate[localizations][fields][0]=slug&populate[localizations][fields][1]=locale&fields[0]=slug&fields[1]=locale&pagination[pageSize]=1000`,
    {
      next: {
        revalidate: 15,
      },
    },
  )
  const { data } = await response.json()

  const contentEntries = buildContentEntries(
    data,
    (locale, slug) => `${ABSOLUTE_URL}/${locale}/${slug}`,
  )
  entries.push(...contentEntries)

  return new NextResponse(renderSitemapXml(entries), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
