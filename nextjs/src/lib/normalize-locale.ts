export function normalizeLocale(locale: string) {
  return locale.replace(
    /-([a-z]{2})$/,
    (_, region) => "-" + region.toUpperCase(),
  )
}
