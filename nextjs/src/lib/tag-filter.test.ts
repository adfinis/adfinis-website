import { describe, expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import {
  hasTagFilter,
  parseTagFilter,
  tagFilterHref,
  toggleTag,
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
  const redHat = { group: "partner", slug: "red-hat" } as const
  const cloud = { group: "solution", slug: "cloud" } as const

  test("a link adds its slug and drops the page", () => {
    expect(tagFilterHref(toggleTag({}, redHat))).toBe("?partner=red-hat")
    expect(tagFilterHref(toggleTag({ solution: ["security"] }, cloud))).toBe(
      "?solution=security,cloud",
    )
  })

  test("a link on a chosen tag removes its slug", () => {
    expect(
      tagFilterHref(
        toggleTag({ partner: ["red-hat"], solution: ["cloud"] }, redHat),
      ),
    ).toBe("?solution=cloud")
    expect(tagFilterHref(toggleTag({ partner: ["red-hat"] }, redHat))).toBe("?")
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
