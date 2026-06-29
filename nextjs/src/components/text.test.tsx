import { render, waitFor } from "@testing-library/react"
import { expect, test } from "vitest"
import Text from "./text"

const markdown = ["Intro paragraph.", "", "```js", "const x = 1", "```", ""].join(
  "\n",
)

test("renders body text and the code text server-side", () => {
  const { container } = render(<Text markdown={markdown} />)
  expect(container.textContent).toContain("Intro paragraph.")
  expect(container.textContent).toContain("const x = 1")
})

test("highlights the code block after hydration", async () => {
  const { container } = render(<Text markdown={markdown} />)
  await waitFor(
    () => {
      expect(container.querySelector("code.hljs")).toBeTruthy()
    },
    { timeout: 3000 },
  )
})
