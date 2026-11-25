import { expect, test } from "@playwright/test"
import { FilteredCarouselPage } from "./pages/filtered-carousel-page"

test("the filtered carousel shows the newest items for its tags", async ({
  page,
}) => {
  const carouselPage = new FilteredCarouselPage(page)
  await carouselPage.open()

  await expect(carouselPage.cards).toHaveCount(3)
  await expect(carouselPage.cards).toContainText([
    "Red Hat news",
    "Red Hat case study",
    "Red Hat event",
  ])
})
