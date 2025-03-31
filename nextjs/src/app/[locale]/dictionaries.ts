import { Locale } from "@/hooks/useLocale"
import "server-only"

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  nl: () => import("@/dictionaries/nl.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  //   "en-US": () =>
  //     import("@/dictionaries/en-US.json").then((module) => module.default),
  //   "en-AU": () =>
  //     import("@/dictionaries/en-AU.json").then((module) => module.default),
  //   "nl-NL": () =>
  //     import("@/dictionaries/nl-NL.json").then((module) => module.default),
  //   "de-CH": () =>
  //     import("@/dictionaries/de-CH.json").then((module) => module.default),
  //   "de-DE": () =>
  //     import("@/dictionaries/de-DE.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  (dictionaries[locale as keyof typeof dictionaries] || dictionaries.en)()
