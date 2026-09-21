import { describe, expect, test } from "vitest"
import { cardSliderOffset } from "./card-slider-offset"

const view = { left: 8, right: 1272 }
const introCard = { left: 8, right: 440 }
const eventCards = Array.from({ length: 10 }, (_, i) => ({
  left: 464 + i * 312,
  right: 752 + i * 312,
}))
const scrolledBy = (scrollLeft: number) =>
  [introCard, ...eventCards].map((card) => ({
    left: card.left - scrollLeft,
    right: card.right - scrollLeft,
  }))

describe("cardSliderOffset", () => {
  test("moves the card cut off on the right to the start of the row", () => {
    expect(cardSliderOffset(view, scrolledBy(0), 1)).toBe(1080)
    expect(cardSliderOffset(view, scrolledBy(1080), 1)).toBe(1248)
  })

  test("moves the card cut off on the left to the end of the row", () => {
    expect(cardSliderOffset(view, scrolledBy(1200), -1)).toBe(-1096)
  })

  test("stays put when there is nothing further to show", () => {
    expect(cardSliderOffset(view, scrolledBy(0), -1)).toBe(0)
    expect(cardSliderOffset(view, scrolledBy(2288), 1)).toBe(0)
  })

  test("does not count a card as cut over a rounding pixel", () => {
    const flush = [
      { left: 8, right: 1272.5 },
      { left: 1296, right: 1584 },
    ]
    expect(cardSliderOffset(view, flush, 1)).toBe(1288)
  })
})
