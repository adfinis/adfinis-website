import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"
import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const titleStyles = cva(["tracking-tight text-title-primary"], {
  variants: {
    level: {
      1: "text-35 lg:text-50 leading-9 lg:leading-13",
      2: "text-35 lg:text-40 leading-9 lg:leading-10",
      3: "text-30 leading-7.5",
    },
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
    boldness: {
      light: "font-light",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    level: 2,
    align: "left",
    boldness: "light",
  },
})

/**
 * @info either children or markdown can be passed, not both
 */
type ChildrenORString =
  | {
      children: React.ReactNode
      markdown?: never
      /**
       * @warning only use className for positioning utilities.
       */
      className?: string
    }
  | {
      markdown: string
      children?: never
      /**
       * @warning only use className for positioning utilities.
       */
      className?: string
    }
type TitleProps = VariantProps<typeof titleStyles> & ChildrenORString

/**
 * @description
 * This component can either be passed markdown with formatting or react nodes with text where the level decides the h tag.
 * @example `### Potential. **Unlocked.**`md ==> `h3>Potential. <strong>Unlocked.</strong></h3>`
 * @example `<Title level={3}>Potential. <strong>Unlocked.</strong></Title>` ==> `h3>Potential. <strong>Unlocked.</strong></h3>`
 */
const Title: React.FC<TitleProps> = ({
  level,
  align,
  children,
  markdown,
  boldness,
  className,
}) => {
  if (markdown) {
    const headingLevel = markdown.startsWith("###")
      ? 3
      : markdown.startsWith("##")
        ? 2
        : 1

    return (
      <Markdown
        remarkPlugins={[remarkGfm]}
        className={clsx([
          titleStyles({ level: headingLevel, align, boldness }),
          className,
        ])}
      >
        {markdown}
      </Markdown>
    )
  }
  const Tag = `h${level || 2}` as keyof JSX.IntrinsicElements
  return (
    <Tag className={clsx([titleStyles({ level, align, boldness })], className)}>
      {children}
    </Tag>
  )
}

export default Title
