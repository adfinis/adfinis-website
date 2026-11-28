"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "@/components/button"
import IconCheck from "@/components/icons/icon-check"
import IconChevronDown from "@/components/icons/icon-chevron-down"
import {
  hasTagFilter,
  tagFilterHref,
  type Tag,
  type TagFilter,
  type TagGroup,
} from "@/lib/tag-filter"

type Props = {
  groups: { group: TagGroup; label: string; tags: Tag[] }[]
  active: TagFilter
  dateRange: boolean
  labels: {
    label: string
    apply: string
    reset: string
    close: string
    dateRange: string
    from: string
    to: string
  }
}

export default function TagFilterPanel(props: Props) {
  const { active, labels } = props

  return (
    <Disclosure
      as="div"
      defaultOpen={hasTagFilter(active)}
      className="relative"
      data-component="TagFilter"
      data-testid="tag-filter"
    >
      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 px-4 lg:px-0">
        <div className="container sm:px-2 flex justify-end">
          <DisclosureButton
            className="pointer-events-auto cursor-pointer select-none text-12 uppercase font-semibold tracking-wider text-sapphire hover:underline data-open:text-white"
            data-testid="tag-filter-toggle"
          >
            {({ open }) => <>{open ? labels.close : labels.label}</>}
          </DisclosureButton>
        </div>
      </div>
      <DisclosurePanel
        transition
        as="section"
        aria-label={labels.label}
        className="group grid grid-rows-[1fr] bg-linear-to-br from-sapphire to-biscay transition-[grid-template-rows] duration-200 ease-out data-closed:grid-rows-[0fr] motion-reduce:transition-none"
        data-scheme="dark"
      >
        <div className="min-h-0 px-4 lg:px-0 group-data-transition:overflow-hidden">
          <TagFilterFields key={tagFilterHref(active)} {...props} />
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

function TagFilterFields({ groups, active, dateRange, labels }: Props) {
  const router = useRouter()
  const href = tagFilterHref(active)
  const [chosen, setChosen] = useState(active)

  function show(filter: TagFilter) {
    router.push(tagFilterHref(filter), { scroll: false })
  }

  return (
    <div className="container sm:px-2 grid gap-6 pt-18 pb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {groups.map(({ group, label, tags }) => {
          const slugs = chosen[group] ?? []
          return (
            <Listbox
              key={group}
              multiple
              value={slugs}
              onChange={(value) => setChosen({ ...chosen, [group]: value })}
            >
              <div className="relative">
                <ListboxButton
                  className="flex h-12.5 w-full cursor-pointer select-none items-center justify-between rounded-full border border-white/50 bg-white/10 px-7 text-left text-white hover:bg-white/20 focus:outline-hidden data-focus:outline-1 data-focus:outline-white"
                  data-testid="tag-filter-group"
                >
                  {label}
                  {slugs.length > 0 && ` (${slugs.length})`}
                  <IconChevronDown className="w-4" />
                </ListboxButton>
                <ListboxOptions className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-3xl bg-white py-3 text-stone shadow-2 focus:outline-hidden">
                  {tags.map((tag) => (
                    <ListboxOption
                      key={tag.slug}
                      value={tag.slug}
                      className="group flex cursor-pointer select-none items-center justify-between px-7 py-2 data-focus:bg-neutral"
                      data-testid="tag-filter-option"
                    >
                      {tag.name}
                      <IconCheck className="invisible text-sapphire group-data-selected:visible" />
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          )
        })}
      </div>
      {dateRange && (
        <fieldset className="grid gap-2">
          <legend className="mb-2 text-12 uppercase font-semibold tracking-wider text-white">
            {labels.dateRange}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {(["from", "to"] as const).map((bound) => (
              <input
                key={bound}
                type="date"
                aria-label={labels[bound]}
                value={chosen[bound] ?? ""}
                min={bound === "to" ? chosen.from : undefined}
                max={bound === "from" ? chosen.to : undefined}
                onChange={({ target }) =>
                  setChosen({
                    ...chosen,
                    [bound]: target.value || undefined,
                  })
                }
                className="h-12.5 w-full rounded-full border border-white/50 bg-white/10 px-7 text-white [color-scheme:dark] hover:bg-white/20 focus:outline-1 focus:outline-white"
                data-testid={`tag-filter-${bound}`}
              />
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          size="large"
          variant="primary"
          disabled={tagFilterHref(chosen) === href}
          onClick={() => show(chosen)}
          data-testid="tag-filter-apply"
        >
          {labels.apply}
        </Button>
        <Button
          type="button"
          size="large"
          variant="secondary"
          disabled={!hasTagFilter(chosen) && !hasTagFilter(active)}
          onClick={() => {
            setChosen({})
            show({})
          }}
        >
          {labels.reset}
        </Button>
      </div>
    </div>
  )
}
