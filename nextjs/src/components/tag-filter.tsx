import LinkButton from "@/components/link-button"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"
import {
  getTags,
  TAG_GROUPS,
  type TagFilter as TagFilterValue,
} from "@/lib/strapi"
import { tagFilterHref, toggleTag } from "@/lib/tag-filter"

export default async function TagFilter({
  locale,
  filter = {},
}: {
  locale: Locale
  filter?: TagFilterValue
}) {
  const [tags, dictionary] = await Promise.all([
    getTags(locale),
    getDictionary(locale),
  ])
  if (tags.length === 0) return null

  const isActive = (tag: (typeof tags)[number]) =>
    Boolean(filter[tag.group]?.includes(tag.slug))
  const active: TagFilterValue = {}
  for (const tag of tags.filter(isActive)) {
    active[tag.group] = [...(active[tag.group] ?? []), tag.slug]
  }
  const groups = TAG_GROUPS.map((group) => ({
    group,
    tags: tags.filter((tag) => tag.group === group),
  })).filter(({ tags }) => tags.length > 0)

  return (
    <nav
      aria-label={dictionary.filters.label}
      className="grid gap-4 mb-12"
      data-component="TagFilter"
    >
      {groups.map(({ group, tags }) => (
        <div key={group} className="flex flex-wrap items-center gap-2">
          <span
            id={`tag-filter-${group}`}
            className="w-full lg:w-28 text-title-primary uppercase font-semibold tracking-wider text-12"
          >
            {dictionary.filters[group]}
          </span>
          <ul
            aria-labelledby={`tag-filter-${group}`}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <li key={tag.slug}>
                <LinkButton
                  href={tagFilterHref(toggleTag(active, tag))}
                  scroll={false}
                  variant={isActive(tag) ? "primary" : "secondary"}
                  className="min-w-0 h-8 px-4 text-12"
                  aria-current={isActive(tag) ? "true" : undefined}
                >
                  {tag.name}
                </LinkButton>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {Object.keys(active).length > 0 && (
        <div>
          <LinkButton
            href={tagFilterHref()}
            scroll={false}
            variant="text"
            className="h-8 text-12"
          >
            {dictionary.filters.reset}
          </LinkButton>
        </div>
      )}
    </nav>
  )
}
