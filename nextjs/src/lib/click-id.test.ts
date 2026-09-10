import { describe, expect, test } from "vitest"
import { parseClickId, readClickIdFromUrl, serializeClickId } from "./click-id"

describe("readClickIdFromUrl", () => {
  test("returns the gclid ahead of the other click ids", () => {
    const params = new URLSearchParams("wbraid=WB&gbraid=GB&gclid=GC")
    expect(readClickIdFromUrl(params)).toEqual({ type: "gclid", value: "GC" })
  })

  test("falls back to gbraid, then wbraid", () => {
    expect(
      readClickIdFromUrl(new URLSearchParams("wbraid=WB&gbraid=GB")),
    ).toEqual({ type: "gbraid", value: "GB" })
    expect(readClickIdFromUrl(new URLSearchParams("wbraid=WB"))).toEqual({
      type: "wbraid",
      value: "WB",
    })
  })

  test("returns nothing for an absent, empty or malformed value", () => {
    expect(readClickIdFromUrl(new URLSearchParams(""))).toBeUndefined()
    expect(readClickIdFromUrl(new URLSearchParams("gclid="))).toBeUndefined()
    expect(
      readClickIdFromUrl(new URLSearchParams("gclid=<script>")),
    ).toBeUndefined()
    expect(
      readClickIdFromUrl(new URLSearchParams(`gclid=${"a".repeat(513)}`)),
    ).toBeUndefined()
  })
})

describe("parseClickId", () => {
  test("round-trips a serialized click id", () => {
    const id = { type: "gclid" as const, value: "Cj0KCQjw-TEST_1.2" }
    expect(parseClickId(serializeClickId(id))).toEqual(id)
  })

  test("returns nothing for an unusable cookie value", () => {
    expect(parseClickId(undefined)).toBeUndefined()
    expect(parseClickId("")).toBeUndefined()
    expect(parseClickId("no-separator")).toBeUndefined()
    expect(parseClickId("fclid:ABC")).toBeUndefined()
    expect(parseClickId("gclid:")).toBeUndefined()
    expect(parseClickId("gclid:<script>")).toBeUndefined()
  })
})
