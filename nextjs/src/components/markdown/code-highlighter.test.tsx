import { render } from "@testing-library/react"
import { expect, test } from "vitest"
import CodeHighlighter from "./code-highlighter"

test("highlights code for a known language and adds the hljs class", () => {
  const { container } = render(
    <CodeHighlighter code={"const x = 1"} language="javascript" />,
  )
  const code = container.querySelector("code")
  expect(code?.className).toContain("hljs")
  expect(code?.textContent).toContain("const x = 1")
  // highlight.js wraps tokens in <span class="hljs-*">
  expect(container.querySelector("span[class^='hljs-']")).toBeTruthy()
})

test("falls back to autodetection for an unknown language", () => {
  const { container } = render(
    <CodeHighlighter code={"SELECT 1"} language="not-a-real-language" />,
  )
  const code = container.querySelector("code")
  expect(code?.className).toContain("hljs")
  expect(code?.textContent).toContain("SELECT 1")
})
