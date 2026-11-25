import type { Locator, Page } from "@playwright/test"
import { TagFilter } from "./tag-filter"

export class OverviewPage {
  readonly tagFilter: TagFilter
  readonly cards: Locator
  readonly noResults: Locator

  constructor(
    private readonly page: Page,
    private readonly path: string,
  ) {
    this.tagFilter = new TagFilter(page)
    this.cards = page.getByTestId("card-grid").getByTestId("card")
    this.noResults = page.getByTestId("no-results")
  }

  async open() {
    await this.page.goto(this.path)
  }
}
