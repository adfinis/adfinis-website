"use client"
import React, { useMemo } from "react"
import dynamic from "next/dynamic"

interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
  // react-markdown passes additional props (e.g. node) that we ignore.
  [key: string]: unknown
}

/**
 * @description react-markdown `code` renderer. Inline code renders as plain
 * <code>. Block code renders the raw code text as a server-rendered placeholder
 * (no layout shift, real text for SEO) and loads the CodeHighlighter via
 * next/dynamic({ ssr: false }) to colorize it client-side after hydration.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const code = String(children ?? "").replace(/\n$/, "")
  const language = /language-(\w+)/.exec(className ?? "")?.[1]
  const isBlock = Boolean(language) || code.includes("\n")

  // dynamic() is created per code block so its `loading` fallback can render
  // the real code text (the placeholder). Memoized so a stable code block does
  // not remount. The highlight.js module is shared across all instances.
  const CodeHighlighter = useMemo(
    () =>
      dynamic(() => import("./code-highlighter"), {
        ssr: false,
        loading: () => <code className={className}>{code}</code>,
      }),
    [code, className],
  )

  if (!isBlock) {
    return <code className={className}>{children}</code>
  }

  return <CodeHighlighter code={code} language={language} />
}

export default CodeBlock
