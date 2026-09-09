import { render } from "@testing-library/react"
import { expect, test } from "vitest"
import SectionQuote from "./section-quote"

const quoteOf = (quote: string) => {
  const { container } = render(<SectionQuote quote={quote} />)
  const blockquote = container.querySelector("blockquote")
  if (!blockquote) throw new Error("no blockquote rendered")
  return blockquote
}

test("renders **text** as bold", () => {
  const blockquote = quoteOf("**bold**")
  expect(blockquote.querySelector("strong")?.textContent).toBe("bold")
  expect(blockquote.querySelector("em")).toBeNull()
})

test("renders *text* as italic", () => {
  const blockquote = quoteOf("*italic*")
  expect(blockquote.querySelector("em")?.textContent).toBe("italic")
})

test("renders _text_ as italic", () => {
  const blockquote = quoteOf("_italic_")
  expect(blockquote.querySelector("em")?.textContent).toBe("italic")
})

test("renders <i> and <em> as italic", () => {
  const tagI = quoteOf("<i>one</i>")
  expect(tagI.querySelector("em")?.textContent).toBe("one")

  const tagEm = quoteOf("<em>two</em>")
  expect(tagEm.querySelector("em")?.textContent).toBe("two")
})

test("keeps bold and italic apart in the same quote", () => {
  const blockquote = quoteOf("**bold** and *italic*")
  expect(blockquote.querySelector("strong")?.textContent).toBe("bold")
  expect(blockquote.querySelector("em")?.textContent).toBe("italic")
  expect(blockquote.textContent).toContain("bold and italic")
})

test("still renders <u>text</u> as underline", () => {
  const blockquote = quoteOf("<u>under</u>")
  expect(blockquote.querySelector("u")?.textContent).toBe("under")
})

test("leaves a lone asterisk between spaces literal", () => {
  const blockquote = quoteOf("a * b")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.textContent).toContain("a * b")
})

test("leaves underscores inside a word literal", () => {
  const blockquote = quoteOf("snake_case_word")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.textContent).toContain("snake_case_word")
})

test("renders italic nested inside bold", () => {
  const blockquote = quoteOf("**bold with _italic_ inside**")
  const strong = blockquote.querySelector("strong")
  expect(strong?.textContent).toBe("bold with italic inside")
  expect(strong?.querySelector("em")?.textContent).toBe("italic")
})

test("renders plain text unchanged", () => {
  const blockquote = quoteOf("just a quote")
  expect(blockquote.textContent).toContain("just a quote")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.querySelector("strong")).toBeNull()
})

test("renders bold nested inside italic", () => {
  const blockquote = quoteOf("*Really **great** work*")
  const em = blockquote.querySelector("em")
  expect(em?.textContent).toBe("Really great work")
  expect(em?.querySelector("strong")?.textContent).toBe("great")
  expect(blockquote.textContent).not.toContain("*")
})

test("keeps a trailing asterisk literal and still renders later bold", () => {
  const blockquote = quoteOf("Cost*: **big**")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.querySelector("strong")?.textContent).toBe("big")
  expect(blockquote.textContent).toContain("Cost*: big")
  expect(blockquote.textContent).not.toContain("**")
})

test("keeps an asterisk before a comma literal and still renders later bold", () => {
  const blockquote = quoteOf("Adfinis*, **great**")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.querySelector("strong")?.textContent).toBe("great")
  expect(blockquote.textContent).toContain("Adfinis*, great")
  expect(blockquote.textContent).not.toContain("**")
})

test("keeps an asterisk inside a word literal and still renders later bold", () => {
  const blockquote = quoteOf("a*b and **bold**")
  expect(blockquote.querySelector("em")).toBeNull()
  expect(blockquote.querySelector("strong")?.textContent).toBe("bold")
  expect(blockquote.textContent).toContain("a*b and bold")
  expect(blockquote.textContent).not.toContain("**")
})
