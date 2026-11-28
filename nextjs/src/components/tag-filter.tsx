import TagFilterPanel from "@/components/tag-filter-panel"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"
import { getTags } from "@/lib/strapi"
import { type TagFilter as TagFilterValue } from "@/lib/tag-filter"

const DROPDOWNS = ["partner", "solution", "location"] as const

export default async function TagFilter({
  locale,
  filter = {},
  dateRange = false,
}: {
  locale: Locale
  filter?: TagFilterValue
  dateRange?: boolean
}) {
  const [tags, dictionary] = await Promise.all([
    getTags(locale),
    getDictionary(locale),
  ])
  if (tags.length === 0) return null

  const active: TagFilterValue = dateRange
    ? { from: filter.from, to: filter.to }
    : {}
  for (const tag of tags) {
    if (filter[tag.group]?.includes(tag.slug)) {
      active[tag.group] = [...(active[tag.group] ?? []), tag.slug]
    }
  }
  const groups = DROPDOWNS.map((group) => ({
    group,
    label: dictionary.filters[group],
    tags: tags.filter((tag) => tag.group === group),
  })).filter(({ tags }) => tags.length > 0)

  return (
    <TagFilterPanel
      groups={groups}
      dateRange={dateRange}
      active={active}
      labels={dictionary.filters}
    />
  )
}
