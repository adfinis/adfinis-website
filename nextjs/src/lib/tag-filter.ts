export const TAG_GROUPS = ["partner", "location", "solution"] as const

export type TagGroup = (typeof TAG_GROUPS)[number]

export type Tag = { name: string; slug: string; group: TagGroup }

export type TagFilter = Partial<Record<TagGroup, string[]>> & {
  from?: string
  to?: string
}

function isDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    new Date(value).toJSON()?.slice(0, 10) === value
  )
}

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
  for (const bound of ["from", "to"] as const) {
    const value = searchParams[bound]
    if (typeof value === "string" && isDate(value)) {
      filter[bound] = value
    }
  }
  return filter
}

export function hasTagFilter(filter: TagFilter = {}) {
  return Boolean(
    TAG_GROUPS.some((group) => filter[group]?.length) ||
    filter.from ||
    filter.to,
  )
}

export function cardLabels(
  kind: { text: string; href: string },
  tags: Tag[] = [],
) {
  return [
    kind,
    ...tags
      .filter(({ group }) => group === "partner")
      .map(({ name, slug }) => ({
        text: name,
        href: kind.href + tagFilterHref({ partner: [slug] }),
      })),
  ]
}

export function tagFilterHref(filter: TagFilter = {}, page?: number) {
  const params = TAG_GROUPS.flatMap((group) =>
    filter[group]?.length
      ? [`${group}=${filter[group].map(encodeURIComponent).join(",")}`]
      : [],
  )
  if (filter.from) {
    params.push(`from=${filter.from}`)
  }
  if (filter.to) {
    params.push(`to=${filter.to}`)
  }
  if (page) {
    params.push(`page=${page}`)
  }
  return `?${params.join("&")}`
}
