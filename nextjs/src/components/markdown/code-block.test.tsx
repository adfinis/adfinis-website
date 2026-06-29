import { render, waitFor } from "@testing-library/react"
import { expect, test } from "vitest"
import CodeBlock from "./code-block"

test("renders inline code as a plain <code> without highlighting", () => {
  const { container } = render(<CodeBlock>{"inlineValue"}</CodeBlock>)
  const code = container.querySelector("code")
  expect(code?.textContent).toBe("inlineValue")
  expect(code?.className ?? "").not.toContain("hljs")
})

test("renders block code text immediately as a placeholder", () => {
  const { container } = render(
    <CodeBlock className="language-javascript">{"const x = 1\n"}</CodeBlock>,
  )
  // Real code text is present in the initial (server-equivalent) render.
  expect(container.textContent).toContain("const x = 1")
})

test("upgrades block code to highlighted output after the highlighter loads", async () => {
  const { container } = render(
    <CodeBlock className="language-javascript">{"const x = 1\n"}</CodeBlock>,
  )
  await waitFor(
    () => {
      expect(container.querySelector("code.hljs")).toBeTruthy()
    },
    { timeout: 3000 },
  )
})
