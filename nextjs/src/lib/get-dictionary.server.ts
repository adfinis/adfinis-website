import { type Locale } from "@/lib/locale"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  "en-au": () => import("@/dictionaries/en-au.json").then((m) => m.default),
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  "de-ch": () => import("@/dictionaries/de-CH.json").then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => {
  return (
    (await dictionaries[locale as keyof typeof dictionaries]?.()) ??
    (await dictionaries.en())
  )
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
