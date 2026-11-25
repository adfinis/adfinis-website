import type { Locator, Page } from "@playwright/test"
import { OverviewPage } from "./overview-page"

export class EventsPage extends OverviewPage {
  readonly pastEvents: Locator

  constructor(page: Page) {
    super(page, "/en/events")
    this.pastEvents = page.getByTestId("past-events").getByTestId("card")
  }
}
