export const TAG_GROUPS = ["partner", "location", "solution"] as const

export type TagGroup = (typeof TAG_GROUPS)[number]

export type Tag = { name: string; slug: string; group: TagGroup }

export type TagFilter = Partial<Record<TagGroup, string[]>>

export type SearchParams = { [key: string]: string | string[] | undefined }

export function parseTagFilter(searchParams: SearchParams = {}): TagFilter {
  const filter: TagFilter = {}
  for (const group of TAG_GROUPS) {
    const slugs = [searchParams[group]]
      .flat()
      .flatMap((value) => value?.split(",") ?? [])
      .filter(Boolean)
    if (slugs.length > 0) {
      filter[group] = [...new Set(slugs)]
    }
  }
  return filter
}

export function hasTagFilter(filter: TagFilter = {}) {
  return TAG_GROUPS.some((group) => filter[group]?.length)
}

export function tagFilterHref(filter: TagFilter = {}, page?: number) {
  const params = TAG_GROUPS.flatMap((group) =>
    filter[group]?.length
      ? [`${group}=${filter[group].map(encodeURIComponent).join(",")}`]
      : [],
  )
  if (page) {
    params.push(`page=${page}`)
  }
  return `?${params.join("&")}`
}
