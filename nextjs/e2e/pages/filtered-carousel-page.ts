import type { Locator, Page } from "@playwright/test"

export class FilteredCarouselPage {
  readonly cards: Locator

  constructor(private readonly page: Page) {
    this.cards = page.getByTestId("filtered-carousel").getByTestId("card")
  }

  async open() {
    await this.page.goto("/en/filtered-carousel")
  }
}
