import { render } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { getLocaleDateRangeFormatted, locales } from "@/lib/locale"
import SectionEvent, { escapeLeadingListMarker } from "./section-event"

describe("escapeLeadingListMarker", () => {
  test.each([
    ["15. September 2026", "15\\. September 2026"],
    ["15) September 2026", "15\\) September 2026"],
    ["15.–16. September 2026", "15\\.–16. September 2026"],
    ["September 15, 2026", "September 15, 2026"],
    ["15 september 2026", "15 september 2026"],
  ])("turns %j into %j", (input, expected) => {
    expect(escapeLeadingListMarker(input)).toBe(expected)
  })
})

describe.each(locales)("event date in %s", (locale) => {
  test.each([
    ["a single day", "2026-09-15", null],
    ["a range", "2026-09-15", "2026-09-16"],
  ])("renders %s as plain text, not a list", (_, startDate, endDate) => {
    const date = getLocaleDateRangeFormatted({ startDate, endDate, locale })
    const { container } = render(<SectionEvent date={date} />)
    const dateItem = container.querySelector("li")
    expect(dateItem?.querySelector("ol, ul")).toBeNull()
    expect(dateItem?.textContent).toBe(date)
  })
})
