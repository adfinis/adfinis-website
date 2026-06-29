"use client"
import React from "react"
import hljs from "highlight.js/lib/common"
import "highlight.js/styles/github.css"

interface CodeHighlighterProps {
  code: string
  language?: string
}

/**
 * @description Client-only syntax highlighter. Loaded via next/dynamic with
 * { ssr: false } so highlight.js never runs during SSR. Renders the highlighted
 * code inside a <code class="hljs"> element. The surrounding <pre> is provided
 * by react-markdown.
 */
const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  language,
}) => {
  const { value } =
    language && hljs.getLanguage(language)
      ? hljs.highlight(code, { language, ignoreIllegals: true })
      : hljs.highlightAuto(code)

  return (
    <code
      className={`hljs${language ? ` language-${language}` : ""}`}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

export default CodeHighlighter
