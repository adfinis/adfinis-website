import { notFound } from "next/navigation"
import { Locale, locales } from "@/lib/locale"
const STRAPI = process.env.STRAPI_API || ""

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

export function getCaseStudiesGrid(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `page-case-studies?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=client_image&sort=publication_date:desc&status=published`,
    { tags: [TAGS.PAGE_CASE_STUDY] },
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

export function getNewsGrid(
  locale: Locale,
  {
    page,
    pageSize,
  }: {
    page: number
    pageSize: number
  },
) {
  validateLocale(locale)
  return strapi(
    `news-pages?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=categories&status=published&sort[0]=publication_date:desc&sort[1]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&status=published`,
    { raw: true, tags: [TAGS.NEWS_PAGE] },
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

export function getEventPageCards(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `event-pages/?locale=${normalizeLocale(locale)}&populate=card_image&populate=hero.background_image&filters[is_past_event][$eq]=false&status=published&sort=date_event:asc`,
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

export function getHallmark(id: string) {
  return strapi(`hallmarks/${id}?populate=hallmark&status=published`, {
    tags: [TAGS.HALLMARK],
  })
}

type Options =
  | {
      raw?: boolean
      tags?: string[]
    }
  | undefined
async function strapi(query: string, options?: Options) {
  const page = await fetch(`${STRAPI}/${query}`, {
    next: {
      tags: options?.tags,
      revalidate: 3600,
    },
  })
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
  const page = await fetch(
    `${STRAPI}/homepage?locale=${normalizeLocale(locale)}&status=published`,
    {
      next: {
        revalidate: 15,
      },
    },
  )
  const { data } = await page.json()
  return data
}
