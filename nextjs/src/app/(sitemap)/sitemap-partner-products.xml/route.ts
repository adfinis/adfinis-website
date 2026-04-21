import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import { Locale } from "@/lib/locale"
import {
  buildContentEntries,
  renderSitemapXml,
} from "@/lib/sitemap"

const STRAPI = process.env.STRAPI_API || ""

export const dynamic = "force-dynamic"

export async function GET() {
  const response = await fetch(
    `${STRAPI}/page-partner-and-products?populate[localizations][fields][0]=slug&populate[localizations][fields][1]=locale&fields[0]=slug&fields[1]=locale&pagination[pageSize]=1000`,
    {
      next: {
        revalidate: 15,
      },
    },
  )
  const { data } = await response.json()

  const contentEntries = buildContentEntries(
    data,
    (locale: Locale, slug: string) =>
      `${ABSOLUTE_URL}/${locale}/${PARTNER_PRODUCTS_SLUGS[locale]}/${slug}`,
  )

  return new NextResponse(
    renderSitemapXml(contentEntries),
    {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    },
  )
}
