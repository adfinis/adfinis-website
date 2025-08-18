import { notFound } from "next/navigation"
import { Locale, locales } from "@/lib/locale"
const STRAPI = process.env.STRAPI_API || ""

function normalizeLocale(locale: string) {
  return locale.replace(
    /-([a-z]{2})$/,
    (_, region) => "-" + region.toUpperCase(),
  )
}

function validateLocale(locale: Locale) {
  if (!locales.includes(locale)) {
    throw new Error("Invalid locale")
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
  return strapi(`homepage?locale=${normalizeLocale(locale)}`)
}

export function getFooter(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `footer/?locale=${normalizeLocale(locale)}&populate=solutions&populate=partner_and_products`,
  )
}

export function getCaseStudy(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `page-case-studies/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getCaseStudiesGrid(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `page-case-studies?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=client_image&sort=publication_date:desc&status=published`,
  )
}

export function getCaseStudiesOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `case-studies-overview?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getNewsPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `news-pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getNewsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `news-overview?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getNewsGrid(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `news-pages?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=categories&status=published&status=published`,
  )
}

export function getPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getPartnerAndProductsPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `page-partner-and-products/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getSolutionPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(`solutions-pages/${slug}?locale=${normalizeLocale(locale)}`)
}

export function getSolutionsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `solutions-overview?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getEventPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(`event-pages/${slug}?locale=${normalizeLocale(locale)}`)
}

export function getEventPageCards(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `event-pages/?locale=${normalizeLocale(locale)}&populate=card_image&populate=hero.background_image`,
  )
}

export function getEventsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `events-overview?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getBlogsOverview(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `blogs-overview?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getBlogOverviewCards(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `blog-pages?locale=${normalizeLocale(locale)}&populate=hero.background_image&populate=categories&status=published`,
  )
}

export function getBlogPage(locale: Locale, slug: string) {
  validateLocale(locale)
  return strapi(
    `blog-pages/${sanitizeSlug(slug)}?locale=${normalizeLocale(locale)}&status=published`,
  )
}

export function getNavigationMenu(locale: Locale) {
  validateLocale(locale)
  return strapi(
    `navigation-menu/?locale=${normalizeLocale(locale)}&populate=section.menu_segment.items&populate=logo_desktop&populate=logo_mobile&populate=cta`,
  )
}

export function getHallmark(id: string) {
  return strapi(`hallmarks/${id}?populate=hallmark`)
}

async function strapi(query: string) {
  const page = await fetch(`${STRAPI}/${query}`, {
    next: {
      revalidate: 0,
    },
  })
  if (page && page.status === 404) {
    return notFound()
  }
  const { data } = await page.json()
  return data
}

export async function strapiWithoutRedirect(locale: Locale) {
  validateLocale(locale)
  const page = await fetch(
    `${STRAPI}/homepage?locale=${normalizeLocale(locale)}`,
    {
      cache: "no-cache",
    },
  )
  const { data } = await page.json()
  return data
}
