import type { Locator, Page } from "@playwright/test"

export class TagFilter {
  private readonly options: Locator

  constructor(page: Page) {
    this.options = page
      .getByTestId("tag-filter")
      .getByTestId("tag-filter-option")
  }

  async choose(name: string) {
    await this.options.filter({ hasText: name }).click()
  }
}
