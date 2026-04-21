import { type Locale, locales } from "./locale"

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
