import type { Page } from "@playwright/test"
import { NEWS_SLUGS } from "@/lib/slugs"
import { OverviewPage } from "./overview-page"

export class NewsPage extends OverviewPage {
  constructor(page: Page) {
    super(page, `/en/${NEWS_SLUGS.en}`)
  }
}
