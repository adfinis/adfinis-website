import type { Locator, Page } from "@playwright/test"

export class TagFilter {
  private readonly filter: Locator

  constructor(page: Page) {
    this.filter = page.getByTestId("tag-filter")
  }

  async choose(group: string, name: string) {
    await this.filter.getByTestId("tag-filter-toggle").click()
    await this.filter
      .getByTestId("tag-filter-group")
      .filter({ hasText: group })
      .click()
    await this.filter
      .getByTestId("tag-filter-option")
      .filter({ hasText: name })
      .click()
    await this.filter.page().keyboard.press("Escape")
    await this.filter.getByTestId("tag-filter-apply").click()
  }

  async chooseDates(from: string, to: string) {
    await this.filter.getByTestId("tag-filter-toggle").click()
    await this.filter.getByTestId("tag-filter-from").fill(from)
    await this.filter.getByTestId("tag-filter-to").fill(to)
    await this.filter.getByTestId("tag-filter-apply").click()
  }
}
