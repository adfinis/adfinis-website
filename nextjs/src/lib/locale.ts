export const locales = ["en", "en-au", "nl", "de-ch", "de-de"] as const

export type Locale = (typeof locales)[number]

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
}

export function getLocaleDateFormatted({
  date,
  locale,
}: {
  date: string
  locale: Locale
}) {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale, DATE_FORMAT_OPTIONS)
}

export function getLocaleDateRangeFormatted({
  startDate,
  endDate,
  locale,
}: {
  startDate: string
  endDate?: string | null
  locale: Locale
}) {
  const start = new Date(startDate)
  if (!endDate || endDate === startDate) {
    return start.toLocaleDateString(locale, DATE_FORMAT_OPTIONS)
  }
  const end = new Date(endDate)
  return new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).formatRange(
    start,
    end,
  )
}
