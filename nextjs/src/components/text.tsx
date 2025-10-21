import React from "react"
import Markdown, { defaultUrlTransform } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

interface TextProps {
  markdown: string
  className?: string
}

export const allowedElements = [
  "a",
  "b",
  "blockquote",
  "br",
  "em",
  "h1",
  "h2",
  "h3",
  "br",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "code",
  "strong",
  "ul",
  "del",
]

/**
 * @description Github-flavored markdown text component.
 *
 * @info styling for this component is located in src/components/text.css
 *
 * @info
 * This component handles basic spacing (presuming gap-8 / 32px.) You may override this by passing a gap-* class to the component.
 *
 * @info GHFM doesn't support different alignment of text. This needs to be passed to the component with a text-* class.
 *
 * @info
 * Github-Flavored Markdown can render a variety of HTML tags. The following tags are currently supported in this component:
 * Paragraphs: <p>
 * Emphasis: <em>, <strong>
 * Lists: <ul>, <ol>, <li>
 * Links: <a>
 * Blockquotes: <blockquote>
 * Headings: <h1>, <h2>, <h3>
 * Strikethrough: <del>
 *
 */
const Text: React.FC<TextProps> = ({ markdown, className }) => {
  return (
    <div className={`markdown-text ${className || ""}`}>
      <Markdown
        allowedElements={allowedElements}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        urlTransform={(url) =>
          url.startsWith("tel:") ? url : defaultUrlTransform(url)
        }
      >
        {markdown}
      </Markdown>
    </div>
  )
}

export default Text
