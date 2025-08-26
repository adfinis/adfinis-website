"use client"

import { type Locale } from "@/lib/locale"
import en from "@/dictionaries/en.json"
import enAU from "@/dictionaries/en-au.json"
import nl from "@/dictionaries/nl.json"
import de from "@/dictionaries/de.json"
import deCH from "@/dictionaries/de-CH.json"

const dictionaries = {
  en,
  nl,
  de,
  "de-CH": deCH,
  "en-AU": enAU,
} as const

/**
 *
 * @warning Try using server component as default.
 */
export const getDictionary = (locale: Locale) => {
  return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en
}

export type Dictionary = ReturnType<typeof getDictionary>
