import type { Page } from "@playwright/test"
import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { OverviewPage } from "./overview-page"

export class CaseStudiesPage extends OverviewPage {
  constructor(page: Page) {
    super(page, `/en/${CASE_STUDIES_SLUGS.en}`)
  }
}
