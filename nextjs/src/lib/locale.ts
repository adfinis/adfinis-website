export const locales = ["en", "en-au", "nl", "de-ch", "de-de"] as const

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
    month: "long",
    day: "2-digit",
  }
  return dateObj.toLocaleDateString(locale, options)
}
