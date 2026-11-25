import { expect, test } from "@playwright/test"
import { CaseStudiesPage } from "./pages/case-studies-page"
import { EventsPage } from "./pages/events-page"
import { NewsPage } from "./pages/news-page"

test("events: upcoming ones fill the grid, past ones their own block", async ({
  page,
}) => {
  const events = new EventsPage(page)
  await events.open()

  await expect(events.cards).toHaveCount(2)
  await expect(events.cards).toContainText(["Red Hat event", "Other event"])
  await expect(events.pastEvents).toHaveCount(2)
  await expect(events.pastEvents).toContainText([
    "Past event",
    "Older past event",
  ])
})

for (const { name, Overview, all, redHat } of [
  { name: "news", Overview: NewsPage, all: 3, redHat: "Red Hat news" },
  { name: "events", Overview: EventsPage, all: 2, redHat: "Red Hat event" },
  {
    name: "case studies",
    Overview: CaseStudiesPage,
    all: 2,
    redHat: "Red Hat case study",
  },
]) {
  test(`${name}: choosing a tag filters the cards and the address`, async ({
    page,
  }) => {
    const overview = new Overview(page)
    await overview.open()
    await expect(overview.cards).toHaveCount(all)

    await overview.tagFilter.choose("Red Hat")

    await expect(page).toHaveURL(/\?partner=red-hat$/)
    await expect(overview.cards).toHaveCount(1)
    await expect(overview.cards).toContainText([redHat])
  })
}

test("news: the no-results text shows only when a filter matches nothing", async ({
  page,
}) => {
  const news = new NewsPage(page)
  await news.open()
  await expect(news.noResults).toBeHidden()

  await news.tagFilter.choose("Zurich")

  await expect(news.noResults).toBeVisible()
  await expect(news.cards).toHaveCount(0)
})
