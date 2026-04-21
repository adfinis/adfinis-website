import { NextResponse } from "next/server"
import { ABSOLUTE_URL } from "./absolute-url"
import { type Locale, locales } from "./locale"

const STRAPI = process.env.STRAPI_API || ""
const DEFAULT_LOCALE = "en"
const HREFLANG_MAP: Record<Locale, string> = {
  en: "en",
  "en-au": "en-AU",
  nl: "nl",
  "de-de": "de-DE",
  "de-ch": "de-CH",
}

export type SitemapAlternate = {
  locale: Locale
  href: string
}

export type SitemapEntry = {
  loc: string
  lastmod: string
  priority?: string
  alternates?: SitemapAlternate[]
}

export function buildIndexEntries(
  buildUrl: (locale: Locale) => string,
): SitemapEntry[] {
  const alternates: SitemapAlternate[] = locales.map((locale) => ({
    locale,
    href: buildUrl(locale),
  }))

  return locales.map((locale) => ({
    loc: buildUrl(locale),
    lastmod: "2025-09-02T00:00:00+00:00",
    alternates,
  }))
}

export function buildContentEntries(
  data: any[],
  buildUrl: (locale: Locale, slug: string) => string,
): SitemapEntry[] {
  const seen = new Set<string>()
  const entries: SitemapEntry[] = []

  for (const item of data) {
    const itemLocale = item.locale.toLowerCase() as Locale

    const group: SitemapAlternate[] = [
      { locale: itemLocale, href: buildUrl(itemLocale, item.slug) },
    ]
    for (const loc of item.localizations) {
      const locale = loc.locale.toLowerCase() as Locale
      group.push({ locale, href: buildUrl(locale, loc.slug) })
    }

    for (const member of group) {
      if (!seen.has(member.href)) {
        seen.add(member.href)
        entries.push({
          loc: member.href,
          lastmod: "2025-09-02T00:00:00+00:00",
          alternates: group,
        })
      }
    }
  }

  return entries
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderEntry).join("\n")}
</urlset>`
}

function renderEntry(entry: SitemapEntry): string {
  const item = [
    `    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>`,
  ]

  if (entry.priority) {
    item.push(`    <priority>${entry.priority}</priority>`)
  }

  if (entry.alternates?.length) {
    for (const alt of entry.alternates) {
      item.push(
        `    <xhtml:link rel="alternate" hreflang="${HREFLANG_MAP[alt.locale]}" href="${alt.href}" />`,
      )
    }
    const enAlt = entry.alternates.find((a) => a.locale === DEFAULT_LOCALE)
    if (enAlt) {
      item.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enAlt.href}" />`,
      )
    }
  }

  return `<url>\n${item.join("\n")}\n</url>`
}

export function buildHomepageEntries(): SitemapEntry[] {
  const alternates: SitemapAlternate[] = locales.map((locale) => ({
    locale,
    href: `${ABSOLUTE_URL}/${locale}`,
  }))

  return [
    {
      loc: `${ABSOLUTE_URL}/`,
      lastmod: "2025-09-02T00:00:00+00:00",
      priority: "1.0",
      alternates,
    },
    ...locales.map((locale) => ({
      loc: `${ABSOLUTE_URL}/${locale}`,
      lastmod: "2025-09-02T00:00:00+00:00",
      priority: "1.0",
      alternates,
    })),
  ]
}

export async function buildCategorySitemap(options: {
  endpoint: string
  categorySlug?: Record<string, string> | string
  includeIndex?: boolean
  extraEntries?: SitemapEntry[]
}): Promise<NextResponse> {
  const { endpoint, categorySlug, includeIndex = true, extraEntries } = options

  const getCategorySlug = (locale: Locale) =>
    typeof categorySlug === "string" ? categorySlug : categorySlug?.[locale]

  const buildUrl = (locale: Locale, slug?: string) => {
    const catSlug = getCategorySlug(locale)
    const parts = [ABSOLUTE_URL, locale, catSlug, slug].filter(Boolean)
    return parts.join("/")
  }

  const entries: SitemapEntry[] = [...(extraEntries ?? [])]

  if (includeIndex) {
    entries.push(
      ...buildIndexEntries((locale) => buildUrl(locale)),
    )
  }

  const response = await fetch(
    `${STRAPI}/${endpoint}?populate[localizations][fields][0]=slug&populate[localizations][fields][1]=locale&fields[0]=slug&fields[1]=locale&pagination[pageSize]=1000`,
    { next: { revalidate: 15 } },
  )
  const { data } = await response.json()

  entries.push(
    ...buildContentEntries(data, (locale, slug) => buildUrl(locale, slug)),
  )

  return new NextResponse(renderSitemapXml(entries), {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}
