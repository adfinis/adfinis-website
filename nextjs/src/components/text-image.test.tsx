import { render } from "@testing-library/react"
import { expect, test } from "vitest"
import TextImage from "./text-image"

test("upgrades bare www autolinks to https instead of http", () => {
  const { container } = render(<TextImage markdown={"www.example.com"} />)
  const link = container.querySelector("a")
  expect(link?.getAttribute("href")).toBe("https://www.example.com")
})

test("keeps explicit https autolinks as https", () => {
  const { container } = render(
    <TextImage markdown={"https://www.example.com"} />,
  )
  const link = container.querySelector("a")
  expect(link?.getAttribute("href")).toBe("https://www.example.com")
})
