export const locales = [
  "en",
  "en-US",
  "en-AU",
  "nl",
  "nl-NL",
  "de",
  "de-CH",
  "de-DE",
] as const

export type Locale = (typeof locales)[number]

export function getLocaleDateFormatted({
  date,
  locale,
}: {
  date: string
  locale: Locale
}) {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }
  return dateObj.toLocaleDateString(locale, options)
}
