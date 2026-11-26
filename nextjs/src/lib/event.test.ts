import { afterEach, describe, expect, test, vi } from "vitest"
import { isPastEvent, today } from "./event"

describe("isPastEvent", () => {
  const now = "2026-11-24"

  test.each([
    ["ended yesterday", "2026-11-22", "2026-11-23", false, true],
    ["ends today", "2026-11-23", "2026-11-24", false, false],
    ["started, still running", "2026-11-20", "2026-11-30", false, false],
    ["no end date, started yesterday", "2026-11-23", null, false, true],
    ["no end date, starts today", "2026-11-24", null, false, false],
    ["upcoming", "2027-01-21", "2027-01-21", false, false],
    ["upcoming, marked past", "2027-01-21", "2027-01-21", true, true],
    ["upcoming, flag missing", "2027-01-21", undefined, null, false],
  ])("%s", (_, date_event, date_event_end, is_past_event, expected) => {
    expect(
      isPastEvent({ date_event, date_event_end, is_past_event }, now),
    ).toBe(expected)
  })
})

describe("today", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test("is the UTC date", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-11-24T23:30:00-05:00"))
    expect(today()).toBe("2026-11-25")
  })
})
