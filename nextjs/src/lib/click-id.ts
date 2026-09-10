export const CLICK_ID_COOKIE = "aw_gclid"
export const CLICK_ID_MAX_AGE = 60 * 60 * 24 * 90

export type ClickIdType = "gclid" | "gbraid" | "wbraid"

export interface ClickId {
  type: ClickIdType
  value: string
}

const CLICK_ID_TYPES: readonly ClickIdType[] = ["gclid", "gbraid", "wbraid"]

const VALID_VALUE = /^[A-Za-z0-9._-]{1,512}$/

export function readClickIdFromUrl(params: URLSearchParams) {
  for (const type of CLICK_ID_TYPES) {
    const value = params.get(type)?.trim()
    if (value && VALID_VALUE.test(value)) return { type, value }
  }
  return undefined
}

export function serializeClickId(id: ClickId) {
  return `${id.type}:${id.value}`
}

export function parseClickId(raw: string | undefined) {
  if (!raw) return undefined
  const separator = raw.indexOf(":")
  if (separator === -1) return undefined

  const type = raw.slice(0, separator)
  const value = raw.slice(separator + 1)
  if (!CLICK_ID_TYPES.includes(type as ClickIdType)) return undefined
  if (!VALID_VALUE.test(value)) return undefined

  return { type: type as ClickIdType, value }
}
