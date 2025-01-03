import { useParams } from "next/navigation"

export const locales = ["en-US", "en-AU", "nl-NL", "de-CH", "de-DE"] as const

export type Locale = (typeof locales)[number]

const getLocale = (input: unknown) => {
  if (typeof input !== "string") return "en-US"
  switch (input) {
    case "en-US":
      return "en-US"
    case "en-AU":
      return "en-AU"
    case "nl-NL":
      return "nl-NL"
    case "de-CH":
      return "de-CH"
    case "de-DE":
      return "de-DE"
    default:
      return "en-US"
  }
}

/**
 *
 * @returns the current locale based on the URL route param
 */
export function useLocale() {
  const { locale } = useParams()
  return getLocale(locale)
}
