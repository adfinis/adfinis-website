import { describe, expect, test } from "vitest"
import { detectLocale } from "./locale"

describe("detectLocale", () => {
  test.each([
    ["de-CH", "de-ch"],
    ["de-ch", "de-ch"],
    ["de-DE", "de-de"],
    ["de", "de-de"], // generic German has no region → Germany
    ["de-AT", "de-de"], // Austrian German falls back to Germany
    ["nl", "nl"],
    ["nl-NL", "nl"],
    ["nl-BE", "nl"], // Flemish maps to the single Dutch locale
    ["en", "en"],
    ["en-US", "en"],
    ["en-GB", "en"],
    ["en-AU", "en-au"],
    ["en-NZ", "en-au"], // New Zealand shares the AU/NZ locale
  ])("maps %s → %s", (input, expected) => {
    expect(detectLocale(input)).toBe(expected)
  })

  test("is case-insensitive", () => {
    expect(detectLocale("DE-ch")).toBe("de-ch")
    expect(detectLocale("EN-au")).toBe("en-au")
  })

  test("returns the fallback for unsupported languages", () => {
    expect(detectLocale("fr-FR")).toBe("en") // default fallback
    expect(detectLocale("ja")).toBe("en")
    expect(detectLocale("fr-FR", "de-ch")).toBe("de-ch") // explicit fallback
  })

  test("returns the fallback for empty or missing input", () => {
    expect(detectLocale(undefined)).toBe("en")
    expect(detectLocale("")).toBe("en")
    expect(detectLocale(undefined, "nl")).toBe("nl")
  })
})
