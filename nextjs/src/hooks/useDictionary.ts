import { getDictionary } from "@/app/[locale]/dictionaries"
import { Locale } from "./useLocale"

export async function dictionary(locale: Locale) {
  return await getDictionary(locale)
}
