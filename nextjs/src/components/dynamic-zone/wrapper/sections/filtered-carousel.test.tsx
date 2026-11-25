import { cleanup, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import type { Tag } from "@/lib/strapi"
import FilteredCarousel from "./filtered-carousel"

type Item = {
  documentId: string
  slug: string
  card_title: string
  publication_date: string | null
  publishedAt: string
}

function item(
  slug: string,
  publication_date: string | null,
  publishedAt: string,
): Item {
  return {
    documentId: slug,
    slug,
    card_title: slug,
    publication_date,
    publishedAt,
  }
}

function newestFirst(a: Item, b: Item) {
  if (a.publication_date === null || b.publication_date === null) {
    return (
      Number(b.publication_date === null) -
        Number(a.publication_date === null) ||
      b.publishedAt.localeCompare(a.publishedAt)
    )
  }
  return b.publication_date.localeCompare(a.publication_date)
}

describe("FilteredCarousel", () => {
  const undatedStories = [1, 2, 3].map((number) =>
    item(`undated-story-${number}`, null, `2025-05-1${number}T10:00:00.000Z`),
  )
  const content: Record<string, Item[]> = {
    "/page-case-studies": [
      ...undatedStories,
      item("dated-story", "2026-11-03", "2026-11-24T10:00:00.000Z"),
    ],
    "/news-pages": [
      item(
        "dated-news",
        "2026-10-28T08:00:00.000Z",
        "2026-11-24T10:00:00.000Z",
      ),
      item("undated-news", null, "2026-11-10T10:00:00.000Z"),
    ],
    "/event-pages/": [],
  }
  let tags: Tag[] = []

  const fetchMock = vi.fn(async (input: string) => {
    const { pathname, searchParams } = new URL(input, "http://strapi")
    if (pathname === "/tags") {
      return Response.json({ data: tags })
    }
    const dated = searchParams.has("filters[publication_date][$notNull]")
    const undated = searchParams.has("filters[publication_date][$null]")
    const data = content[pathname]
      .filter(({ publication_date }) =>
        publication_date === null ? !dated : !undated,
      )
      .sort(newestFirst)
      .slice(0, Number(searchParams.get("pagination[pageSize]")))
    return Response.json({ data })
  })

  beforeEach(() => {
    tags = [{ name: "Red Hat", slug: "red-hat", group: "partner" }]
    vi.stubGlobal("fetch", fetchMock)
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      },
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    fetchMock.mockClear()
  })

  async function shownTitles(section: object) {
    const carousel = await FilteredCarousel({
      section: { props: {}, title: "", description: "", ...section } as any,
      locale: "en",
    })
    if (carousel === null) {
      return null
    }
    return render(carousel)
      .queryAllByTestId("card-title")
      .map((title) => title.textContent)
  }

  test("a dated story is shown before older undated ones", async () => {
    await expect(
      shownTitles({ resource: "success-stories", limit: 2 }),
    ).resolves.toEqual(["dated-story", "undated-story-3"])
  })

  test("all: undated items take their place by publishedAt", async () => {
    await expect(shownTitles({ resource: "all", limit: 3 })).resolves.toEqual([
      "undated-news",
      "dated-story",
      "dated-news",
    ])
  })

  test("tags that no longer exist show nothing, not everything", async () => {
    tags = [{ name: "SUSE", slug: "suse", group: "partner" }]

    await expect(
      shownTitles({
        resource: "all",
        tags: [{ name: "Red Hat", slug: "red-hat", group: "partner" }],
      }),
    ).resolves.toBeNull()
    expect(fetchMock.mock.calls.every(([url]) => url.includes("/tags?"))).toBe(
      true,
    )
  })

  test("a tag that still exists filters the carousel", async () => {
    await shownTitles({
      resource: "news",
      tags: [
        { name: "Red Hat", slug: "red-hat", group: "partner" },
        { name: "Gone", slug: "gone", group: "partner" },
      ],
    })

    const contentUrls = fetchMock.mock.calls
      .map(([url]) => new URL(url, "http://strapi"))
      .filter(({ pathname }) => pathname === "/news-pages")
    expect(contentUrls).toHaveLength(2)
    for (const { searchParams } of contentUrls) {
      expect(searchParams.get("filters[tags][slug][$in][0]")).toBe("red-hat")
      expect(searchParams.has("filters[tags][slug][$in][1]")).toBe(false)
    }
  })
})
