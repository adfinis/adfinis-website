import { Locale } from "./locale"

export const PARTNER_PRODUCTS_SLUGS: Record<Locale, string> = {
  nl: "partners-en-producten",
  en: "partners-and-products",
  "en-au": "partners-and-products",
  "de-ch": "partner-und-produkte",
  "de-de": "partner-und-produkte",
} as const

export const CASE_STUDIES_SLUGS: Record<Locale, string> = {
  nl: "casestudies",
  en: "case-studies",
  "en-au": "case-studies",
  "de-ch": "referenzen",
  "de-de": "referenzen",
} as const

export const SOLUTIONS_SLUGS: Record<Locale, string> = {
  nl: "oplossingen",
  en: "solutions",
  "en-au": "solutions",
  "de-ch": "loesungen",
  "de-de": "loesungen",
} as const

export const NEWS_SLUGS: { [key: string]: string } = {
  nl: "nieuws",
  en: "news",
  "en-au": "news",
  "de-ch": "news",
  "de-de": "news",
}

export const BLOG_SLUGS: { [key: string]: string } = {
  nl: "blogs",
  en: "blogs",
  "en-au": "blogs",
  "de-ch": "blogs",
  "de-de": "blogs",
}
