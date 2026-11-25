import { describe, expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import {
  cardLabels,
  hasTagFilter,
  parseTagFilter,
  tagFilterHref,
} from "./tag-filter"

describe("hasTagFilter", () => {
  test("is false without a filter or with only empty groups", () => {
    expect(hasTagFilter()).toBe(false)
    expect(hasTagFilter({})).toBe(false)
    expect(hasTagFilter({ partner: [] })).toBe(false)
  })

  test("is true when any group holds a slug", () => {
    expect(hasTagFilter({ solution: ["cloud"] })).toBe(true)
  })
})

describe("parseTagFilter", () => {
  test("no address query gives an empty filter", () => {
    expect(parseTagFilter()).toEqual({})
    expect(parseTagFilter({ page: "2" })).toEqual({})
  })

  test("reads one slug list per group and ignores other keys", () => {
    expect(
      parseTagFilter({
        partner: "red-hat",
        location: "germany",
        solution: "cloud,security",
        page: "2",
        utm_source: "mail",
      }),
    ).toEqual({
      partner: ["red-hat"],
      location: ["germany"],
      solution: ["cloud", "security"],
    })
  })

  test("joins a repeated key and drops empty and double values", () => {
    expect(
      parseTagFilter({
        partner: ["red-hat,suse", "red-hat", ""],
        location: ",",
      }),
    ).toEqual({ partner: ["red-hat", "suse"] })
  })
})

describe("filter links", () => {
  test("a link holds every chosen slug, and none for an empty group", () => {
    expect(tagFilterHref({ partner: ["red-hat"] })).toBe("?partner=red-hat")
    expect(
      tagFilterHref({ partner: [], solution: ["security", "cloud"] }),
    ).toBe("?solution=security,cloud")
    expect(tagFilterHref({ partner: [] })).toBe("?")
  })

  test("groups keep a fixed order whatever the order chosen", () => {
    expect(tagFilterHref({ solution: ["cloud"], location: ["germany"] })).toBe(
      "?location=germany&solution=cloud",
    )
  })

  test("pagination links keep the filter", () => {
    expect(tagFilterHref({ partner: ["red-hat"] }, 2)).toBe(
      "?partner=red-hat&page=2",
    )
    expect(tagFilterHref(undefined, 3)).toBe("?page=3")
  })

  test("values that are not slugs are escaped", () => {
    expect(tagFilterHref({ partner: ["a&b=c"] })).toBe("?partner=a%26b%3Dc")
  })
})

test("card labels: the kind first, then only partner tags, linked to the filter", () => {
  expect(
    cardLabels({ text: "News", href: "/en/news" }, [
      { name: "Red Hat", slug: "red-hat", group: "partner" },
      { name: "Zurich", slug: "zurich", group: "location" },
    ]),
  ).toEqual([
    { text: "News", href: "/en/news" },
    { text: "Red Hat", href: "/en/news?partner=red-hat" },
  ])
  expect(cardLabels({ text: "Event", href: "/en/events" })).toHaveLength(1)
})

test("a date range is read from the address and written back, bad dates dropped", () => {
  const filter = parseTagFilter({
    partner: "red-hat",
    from: "2026-01-01",
    to: "next week",
  })
  expect(parseTagFilter({ from: "2026-02-31", to: "2026-13-01" })).toEqual({})

  expect(filter).toEqual({ partner: ["red-hat"], from: "2026-01-01" })
  expect(hasTagFilter({ to: "2026-02-01" })).toBe(true)
  expect(tagFilterHref({ ...filter, to: "2026-02-01" }, 2)).toBe(
    "?partner=red-hat&from=2026-01-01&to=2026-02-01&page=2",
  )
})
