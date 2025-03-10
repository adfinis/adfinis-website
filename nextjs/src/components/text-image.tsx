import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface TextImage {
  markdown: string
  className?: string
}

/**
 * @description Github-flavored markdown text component with images support.
 * This is a copy of text.tsx with added support for images, as we don't want to pollute the original component with image support.
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
 * Images: <img>
 *
 */
const TextImage: React.FC<TextImage> = ({ markdown, className }) => {
  return (
    <div className={`markdown-text markdown-text-image ${className || ""}`}>
      <Markdown
        allowedElements={[
          "a",
          "b",
          "blockquote",
          "em",
          "h1",
          "h2",
          "h3",
          "hr",
          "i",
          "li",
          "ol",
          "p",
          "pre",
          "strong",
          "ul",
          "del",
          "img",
        ]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </Markdown>
    </div>
  )
}

export default TextImage
