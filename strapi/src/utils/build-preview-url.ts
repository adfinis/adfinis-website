type Locale = "en" | "en-au" | "nl" | "de-ch" | "de-de"

type LocaleMap = Record<Locale, string>

const SECTION_SLUGS: Record<string, LocaleMap> = {
  caseStudy: {
    en: "case-studies",
    "en-au": "case-studies",
    nl: "casestudies",
    "de-ch": "referenzen",
    "de-de": "referenzen",
  },
  solutions: {
    en: "solutions",
    "en-au": "solutions",
    nl: "oplossingen",
    "de-ch": "loesungen",
    "de-de": "loesungen",
  },
  partnerProducts: {
    en: "partners-and-products",
    "en-au": "partners-and-products",
    nl: "partners-en-producten",
    "de-ch": "partner-und-produkte",
    "de-de": "partner-und-produkte",
  },
  news: {
    en: "news",
    "en-au": "news",
    nl: "nieuws",
    "de-ch": "news",
    "de-de": "news",
  },
  blog: {
    en: "blogs",
    "en-au": "blogs",
    nl: "blogs",
    "de-ch": "blogs",
    "de-de": "blogs",
  },
}

const TYPE_SEGMENT: Record<string, string> = {
  "api::page.page": "page",
  "api::page-case-study.page-case-study": "case-study",
  "api::page-partner-and-product.page-partner-and-product": "partner-product",
  "api::solutions-page.solutions-page": "solutions-page",
  "api::news-page.news-page": "news",
  "api::blog-page.blog-page": "blog",
  "api::event-page.event-page": "event",
}

const GLOBAL_UIDS = new Set<string>([
  "api::footer.footer",
  "api::navigation-menu.navigation-menu",
  "api::hallmark.hallmark",
  "api::content-offer.content-offer",
])

export async function buildPreviewUrl(
  strapi: any,
  uid: string,
  documentId: string,
  locale: Locale,
): Promise<string | null> {
  if (GLOBAL_UIDS.has(uid)) return null

  switch (uid) {
    case "api::homepage.homepage":
      return `/${locale}`
    case "api::case-studies-overview.case-studies-overview":
      return `/${locale}/${SECTION_SLUGS.caseStudy[locale]}`
    case "api::solutions-overview.solutions-overview":
      return `/${locale}/${SECTION_SLUGS.solutions[locale]}`
    case "api::blogs-overview.blogs-overview":
      return `/${locale}/${SECTION_SLUGS.blog[locale]}`
    case "api::news-overview.news-overview":
      return `/${locale}/${SECTION_SLUGS.news[locale]}`
    case "api::events-overview.events-overview":
      return `/${locale}/events`
  }

  let slug: string | undefined
  try {
    const doc = await strapi
      .documents(uid)
      .findOne({ documentId, locale, status: "draft" })
    slug = doc?.slug
  } catch {
    slug = undefined
  }

  if (slug) {
    switch (uid) {
      case "api::page.page":
        return `/${locale}/${slug}`
      case "api::page-case-study.page-case-study":
        return `/${locale}/${SECTION_SLUGS.caseStudy[locale]}/${slug}`
      case "api::solutions-page.solutions-page":
        return `/${locale}/${SECTION_SLUGS.solutions[locale]}/${slug}`
      case "api::page-partner-and-product.page-partner-and-product":
        return `/${locale}/${SECTION_SLUGS.partnerProducts[locale]}/${slug}`
      case "api::news-page.news-page":
        return `/${locale}/${SECTION_SLUGS.news[locale]}/${slug}`
      case "api::blog-page.blog-page":
        return `/${locale}/${SECTION_SLUGS.blog[locale]}/${slug}`
      case "api::event-page.event-page":
        return `/${locale}/events/${slug}`
    }
  }

  const type = TYPE_SEGMENT[uid]
  return type ? `/${locale}/preview/${type}/${documentId}` : null
}
