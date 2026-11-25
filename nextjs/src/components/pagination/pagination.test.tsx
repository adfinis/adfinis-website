import { render } from "@testing-library/react"
import { expect, test, vi } from "vitest"

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}))
vi.mock("next/navigation", () => ({ notFound: vi.fn() }))

import Pagination from "./pagination"

async function hrefs(filter?: Parameters<typeof Pagination>[0]["filter"]) {
  const { container } = render(
    await Pagination({
      page: 2,
      pageSize: 24,
      pageCount: 3,
      total: 60,
      locale: "en",
      filter,
    }),
  )
  return [...container.querySelectorAll("a")].map((link) =>
    link.getAttribute("href"),
  )
}

test("previous and next links keep the filter", async () => {
  expect(
    await hrefs({ partner: ["red-hat"], solution: ["cloud", "security"] }),
  ).toEqual([
    "?partner=red-hat&solution=cloud,security&page=1",
    "?partner=red-hat&solution=cloud,security&page=3",
  ])
})

test("without a filter the links only carry the page", async () => {
  expect(await hrefs()).toEqual(["?page=1", "?page=3"])
})
