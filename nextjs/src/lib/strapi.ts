import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Locale, locales } from "@/lib/locale"
import { today } from "@/lib/event"
const STRAPI = process.env.STRAPI_API || ""
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ""

export function strapiFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  if (STRAPI_TOKEN && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`)
  }
  return fetch(`${STRAPI}/${path}`, { ...init, headers })
}

export const TAGS = {
  HOMEPAGE: "homepage",
  FOOTER: "footer",
  NAVIGATION_MENU: "navigation-menu",
  HALLMARK: "hallmark",
  PAGE: "page",
  PAGE_CASE_STUDY: "page-case-study",
  CASE_STUDIES_OVERVIEW: "case-studies-overview",
  PAGE_PARTNER_AND_PRODUCT: "page-partner-and-product",
  SOLUTIONS_PAGE: "solutions-page",
  SOLUTIONS_OVERVIEW: "solutions-overview",
  EVENT_PAGE: "event-page",
  EVENTS_OVERVIEW: "events-overview",
  BLOG_PAGE: "blog-page",
  BLOGS_OVERVIEW: "blogs-overview",
  NEWS_PAGE: "news-page",
  NEWS_OVERVIEW: "news-overview",
  TAG: "tag",
  LLM: "llm",
} as const

export function normalizeLocale(locale: string) {
  return locale.replace(
    /-([a-z]{2})$/,
    (_, region) => "-" + region.toUpperCase(),
  )
}

function validateLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    return notFound()
  }
}

function sanitizeSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export const TAG_GROUPS = ["partner", "location", "solution"] as const

export type TagGroup = (typeof TAG_GROUPS)[number]

export type Tag = { name: string; slug: string; group: TagGroup }

export type TagFilter = Partial<Record<TagGroup, string[]>>

/**
 * Answers with no tags when Strapi refuses or lacks the endpoint, so the
 * overviews render unfiltered instead of 404.
 */
export async function getTags(locale: Locale): Promise<Tag[]> {
  validateLocale(locale)
  const { isEnabled: isDraft } = await draftMode()

  const fetchOptions: RequestInit = isDraft
    ? { cache: "no-store" }
    : { next: { tags: [TAGS.TAG], revalidate: 3600 } }

  const response = await strapiFetch(
    `tags?locale=${normalizeLocale(locale)}&sort=name:asc&pagination[pageSize]=100`,
    fetchOptions,
  )
  if (!response.ok) {
    return []
  }
  const res = await response.json().catch(() => null)
  return res?.data ?? []
}

async function tagFilterQuery(locale: Locale, filter: TagFilter = {}) {
  if (!TAG_GROUPS.some((group) => filter[group]?.length)) {
    return ""
  }
  const tags = await getTags(locale)
  return tags
    .filter((tag) => filter[tag.group]?.includes(tag.slug))
    .map((tag, index) => `&filters[tags][slug][$in][${index}]=${tag.slug}`)
    .join("")
}

/**
 * Postgres sorts items without a publication date first when the newest are
 * asked for. The carousel asks for dated and undated items apart instead.
 */
function datedQuery(dated?: boolean) {
  if (dated === undefined) {
    return ""
  }
  return `&filters[publication_date][${dated ? "$notNull" : "$null"}]=true`
}

export function getHomepage(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `homepage?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.HOMEPAGE] },
  )
}

export function getFooter(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `footer/?locale=${normalizeLocale(locale)}&populate[solution_links][populate][page][fields][]=metadata_title&populate[solution_links][populate][page][fields][]=slug&populate[partner_product_links][populate][page][fields][]=metadata_title&populate[partner_product_links][populate][page][fields][]=slug&status=published`,
    { tags: [TAGS.FOOTER] },
  )
}

export function getCaseStudy(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `page-case-studies/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE_CASE_STUDY] },
  )
}

export async function getCaseStudiesGrid(
  locale: Locale,
  filter?: TagFilter,
  { pageSize = 100, dated }: { pageSize?: number; dated?: boolean } = {},
) {
  validateLocale(locale)
  const sort =
    dated === undefined
      ? "sort=publication_date:desc"
      : "sort[0]=publication_date:desc&sort[1]=publishedAt:desc"
  return strapi(
    `page-case-studies?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=client_image&${sort}&pagination[pageSize]=${pageSize}&status=published${datedQuery(dated)}${await tagFilterQuery(locale, filter)}`,
    { tags: [TAGS.PAGE_CASE_STUDY, TAGS.TAG] },
  )
}

export function getCaseStudiesOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `case-studies-overview?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.CASE_STUDIES_OVERVIEW] },
  )
}

export function getNewsPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `news-pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.NEWS_PAGE] },
  )
}

export function getNewsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `news-overview?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.NEWS_OVERVIEW] },
  )
}

export async function getNewsGrid(
  locale: Locale,
  {
    page,
    pageSize,
    filter,
    dated,
  }: {
    page: number
    pageSize: number
    filter?: TagFilter
    dated?: boolean
  },
) {
  validateLocale(locale)
  return strapi(
    `news-pages?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=categories&populate=tags&sort[0]=publication_date:desc&sort[1]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&status=published${datedQuery(dated)}${await tagFilterQuery(locale, filter)}`,
    { raw: true, tags: [TAGS.NEWS_PAGE, TAGS.TAG] },
  )
}

export function getPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE] },
  )
}

export function getPartnerAndProductsPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `page-partner-and-products/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE_PARTNER_AND_PRODUCT] },
  )
}

export function getSolutionPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `solutions-pages/${slug}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.SOLUTIONS_PAGE] },
  )
}

export function getSolutionsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `solutions-overview?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.SOLUTIONS_OVERVIEW] },
  )
}

export function getEventPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `event-pages/${slug}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.EVENT_PAGE] },
  )
}

export async function getEventPageCards(
  locale: Locale,
  filter?: TagFilter,
  {
    sort = "date_event:asc",
    pageSize = 100,
  }: { sort?: "date_event:asc" | "createdAt:desc"; pageSize?: number } = {},
) {
  validateLocale(locale)
  const now = today()
  return strapi(
    `event-pages/?locale=${normalizeLocale(locale)}&populate=card_image&populate=hero.background_image&filters[is_past_event][$eq]=false&filters[$or][0][date_event_end][$gte]=${now}&filters[$or][1][$and][0][date_event_end][$null]=true&filters[$or][1][$and][1][date_event][$gte]=${now}&status=published&sort=${sort}&pagination[pageSize]=${pageSize}${await tagFilterQuery(locale, filter)}`,
    { tags: [TAGS.EVENT_PAGE, TAGS.TAG] },
  )
}

export function getPastEventPageCards(locale: Locale) {
  validateLocale(locale)
  const now = today()
  return strapi(
    `event-pages/?locale=${normalizeLocale(locale)}&populate=card_image&populate=hero.background_image&filters[$or][0][is_past_event][$eq]=true&filters[$or][1][date_event_end][$lt]=${now}&filters[$or][2][$and][0][date_event_end][$null]=true&filters[$or][2][$and][1][date_event][$lt]=${now}&status=published&sort=date_event:desc&pagination[pageSize]=12`,
    { tags: [TAGS.EVENT_PAGE] },
  )
}

export function getEventsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `events-overview?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.EVENTS_OVERVIEW] },
  )
}

export function getBlogsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `blogs-overview?locale=${normalizeLocale(locale)}&populate[seo][populate]=*&status=published`,
    { tags: [TAGS.BLOGS_OVERVIEW] },
  )
}

export function getBlogOverviewCards(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `blog-pages?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=categories&status=published`,
    { tags: [TAGS.BLOG_PAGE] },
  )
}

export function getBlogPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `blog-pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.BLOG_PAGE] },
  )
}

export function getNavigationMenu(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `navigation-menu/?locale=${normalizeLocale(locale)}&populate=section.menu_segment.items&populate=logo_desktop&populate=logo_mobile&populate=cta&status=published`,
    { tags: [TAGS.NAVIGATION_MENU] },
  )
}

export function getLlm() {
  return strapi(`llm?status=published`, { tags: [TAGS.LLM] })
}

export function getHallmark(id: string) {
  return strapi(`hallmarks/${id}?populate=hallmark&status=published`, {
    tags: [TAGS.HALLMARK],
  })
}

export function getPageByDocumentId(documentId: string, locale: Locale) {
  validateLocale(locale)
  return strapi(
    `pages/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE] },
  )
}

export function getCaseStudyByDocumentId(documentId: string, locale: Locale) {
  validateLocale(locale)
  return strapi(
    `page-case-studies/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE_CASE_STUDY] },
  )
}

export function getPartnerAndProductsByDocumentId(
  documentId: string,
  locale: Locale,
) {
  validateLocale(locale)
  return strapi(
    `page-partner-and-products/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.PAGE_PARTNER_AND_PRODUCT] },
  )
}

export function getSolutionPageByDocumentId(
  documentId: string,
  locale: Locale,
) {
  validateLocale(locale)
  return strapi(
    `solutions-pages/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.SOLUTIONS_PAGE] },
  )
}

export function getNewsPageByDocumentId(documentId: string, locale: Locale) {
  validateLocale(locale)
  return strapi(
    `news-pages/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.NEWS_PAGE] },
  )
}

export function getBlogPageByDocumentId(documentId: string, locale: Locale) {
  validateLocale(locale)
  return strapi(
    `blog-pages/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.BLOG_PAGE] },
  )
}

export function getEventPageByDocumentId(documentId: string, locale: Locale) {
  validateLocale(locale)
  return strapi(
    `event-pages/${documentId}?byDocumentId=true&locale=${normalizeLocale(locale)}&status=published`,
    { tags: [TAGS.EVENT_PAGE] },
  )
}

type Options =
  | {
      raw?: boolean
      tags?: string[]
    }
  | undefined
async function strapi(query: string, options?: Options) {
  const { isEnabled: isDraft } = await draftMode()

  const finalQuery = isDraft
    ? query.replace(/(\?|&)status=published/, "$1status=draft")
    : query

  const fetchOptions: RequestInit = isDraft
    ? { cache: "no-store" }
    : { next: { tags: options?.tags, revalidate: 3600 } }

  const page = await strapiFetch(finalQuery, fetchOptions)
  if (!page.ok) {
    return notFound()
  }
  const res = await page.json().catch(() => null)
  if (!res) {
    return notFound()
  }
  if (options?.raw) {
    return res
  }
  if (res.data == null) {
    return notFound()
  }
  return res.data
}

export async function strapiWithoutRedirect(locale: Locale) {
  validateLocale(locale)
  const { isEnabled: isDraft } = await draftMode()

  const query = isDraft
    ? `homepage?locale=${normalizeLocale(locale)}&status=draft`
    : `homepage?locale=${normalizeLocale(locale)}&status=published`

  const fetchOptions: RequestInit = isDraft
    ? { cache: "no-store" }
    : { next: { revalidate: 15 } }

  const page = await strapiFetch(query, fetchOptions)
  const { data } = await page.json()
  return data
}
