import { TAG_GROUPS, type Tag, type TagFilter } from "@/lib/strapi"

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

export function toggleTag(
  filter: TagFilter,
  { group, slug }: Pick<Tag, "group" | "slug">,
): TagFilter {
  const slugs = filter[group] ?? []
  return {
    ...filter,
    [group]: slugs.includes(slug)
      ? slugs.filter((item) => item !== slug)
      : [...slugs, slug],
  }
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
