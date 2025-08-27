"use client"

import { type Locale } from "@/lib/locale"
import en from "@/dictionaries/en.json"
import enAU from "@/dictionaries/en-au.json"
import nl from "@/dictionaries/nl.json"
import deCH from "@/dictionaries/de-ch.json"
import deDE from "@/dictionaries/de-de.json"

const dictionaries = {
  en,
  nl,
  "de-ch": deCH,
  "de-de": deDE,
  "en-au": enAU,
} as const

/**
 *
 * @warning Try using server component as default.
 */
export const getDictionary = (locale: Locale) => {
  return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en
}

export type Dictionary = ReturnType<typeof getDictionary>
