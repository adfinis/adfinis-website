import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import { getEventPageCards, getPastEventPageCards } from "./strapi"

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
