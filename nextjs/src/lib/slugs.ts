import { Locale } from "./locale"

export const PARTNER_PRODUCTS_SLUGS: Record<Locale, string> = {
  nl: "partners-en-producten",
  en: "partners-and-products",
  de: "partner-und-produkte",
  "de-CH": "partner-und-produkte",
} as const

export const CASE_STUDIES_SLUGS: Record<Locale, string> = {
  nl: "casestudies",
  en: "case-studies",
  de: "referenzen",
  "de-CH": "referenzen",
} as const

export const SOLUTIONS_SLUGS: Record<Locale, string> = {
  nl: "oplossingen",
  en: "solutions",
  de: "loesungen",
  "de-CH": "loesungen",
} as const

export const NEWS_SLUGS: { [key: string]: string } = {
  nl: "nieuws",
  en: "news",
  de: "news",
  "de-CH": "news",
}
