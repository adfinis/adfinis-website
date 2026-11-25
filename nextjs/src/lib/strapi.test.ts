import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import { notFound } from "next/navigation"
import {
  getCaseStudiesGrid,
  getEventPageCards,
  getNewsGrid,
  getPastEventPageCards,
  getTags,
} from "./strapi"

describe("event card queries", () => {
  const fetchMock = vi.fn(async () => Response.json({ data: [] }))

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-11-24T12:00:00Z"))
    vi.stubGlobal("fetch", fetchMock)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    fetchMock.mockClear()
  })

  function requestedParams() {
    const [url] = fetchMock.mock.calls[0] as unknown as [string]
    return Object.fromEntries(new URL(url, "http://strapi").searchParams)
  }

  test("upcoming: not marked past and not ended, nearest first", async () => {
    await getEventPageCards("de-ch")

    expect(requestedParams()).toMatchObject({
      locale: "de-CH",
      "filters[is_past_event][$eq]": "false",
      "filters[$or][0][date_event_end][$gte]": "2026-11-24",
      "filters[$or][1][$and][0][date_event_end][$null]": "true",
      "filters[$or][1][$and][1][date_event][$gte]": "2026-11-24",
      sort: "date_event:asc",
      "pagination[pageSize]": "100",
    })
  })

  test("past: marked past or ended, newest 12 first", async () => {
    await getPastEventPageCards("en")

    expect(requestedParams()).toMatchObject({
      locale: "en",
      "filters[$or][0][is_past_event][$eq]": "true",
      "filters[$or][1][date_event_end][$lt]": "2026-11-24",
      "filters[$or][2][$and][0][date_event_end][$null]": "true",
      "filters[$or][2][$and][1][date_event][$lt]": "2026-11-24",
      sort: "date_event:desc",
      "pagination[pageSize]": "12",
    })
  })
})

describe("tag queries", () => {
  const tags = [
    { name: "Deutschland", slug: "germany", group: "location" },
    { name: "Red Hat", slug: "red-hat", group: "partner" },
    { name: "Schweiz", slug: "switzerland", group: "location" },
  ]
  const fetchMock = vi.fn(async (url: string) =>
    Response.json({ data: url.includes("/tags?") ? tags : [] }),
  )

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    fetchMock.mockClear()
  })

  function request(index: number) {
    const [url, init] = fetchMock.mock.calls[index] as unknown as [
      string,
      { next: { tags: string[] } },
    ]
    return {
      path: new URL(url, "http://strapi").pathname,
      params: Object.fromEntries(new URL(url, "http://strapi").searchParams),
      cacheTags: init.next.tags,
    }
  }

  test("getTags asks for every tag of the locale", async () => {
    await expect(getTags("de-ch")).resolves.toEqual(tags)

    expect(request(0)).toMatchObject({
      path: "/tags",
      params: { locale: "de-CH", "pagination[pageSize]": "100" },
      cacheTags: ["tag"],
    })
  })

  test("getTags answers with no tags when Strapi refuses", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 403 }))

    await expect(getTags("en")).resolves.toEqual([])
    expect(notFound).not.toHaveBeenCalled()
  })

  test("news: any chosen tag matches, in one $in", async () => {
    await getNewsGrid("de-ch", {
      page: 2,
      pageSize: 24,
      filter: { partner: ["red-hat"], location: ["germany"] },
    })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(request(1)).toMatchObject({
      path: "/news-pages",
      params: {
        locale: "de-CH",
        "filters[tags][slug][$in][0]": "germany",
        "filters[tags][slug][$in][1]": "red-hat",
        "pagination[page]": "2",
        "pagination[pageSize]": "24",
      },
      cacheTags: ["news-page", "tag"],
    })
  })

  test("unknown slugs and slugs of another group are dropped", async () => {
    await getEventPageCards("en", {
      partner: ["red-hat", "germany", "nope&filters[id][$gt]=0"],
    })

    const { params } = request(1)
    expect(params["filters[tags][slug][$in][0]"]).toBe("red-hat")
    expect(
      Object.keys(params).filter((key) => key.startsWith("filters[tags]")),
    ).toHaveLength(1)
    expect(params["filters[id][$gt]"]).toBeUndefined()
  })

  test("no filter: one request, no tag filter", async () => {
    await getCaseStudiesGrid("en")
    await getEventPageCards("en", { solution: [] })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    for (const index of [0, 1]) {
      const { params } = request(index)
      expect(Object.keys(params).join()).not.toContain("filters[tags]")
      expect(params["pagination[pageSize]"]).toBe("100")
    }
  })
})
