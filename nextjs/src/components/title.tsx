import { cva, VariantProps } from "class-variance-authority"
import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const titleStyles = cva(["font-light tracking-tight text-title-primary"], {
  variants: {
    level: {
      1: "text-35 lg:text-50 leading-[30px] lg:leading-[50px]",
      2: "text-35 lg:text-40 leading-[30px] lg:leading-[45px]",
      3: "text-30 leading-[25px] lg:leading-[40px]",
    },
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: 2,
    align: "left",
  },
})

type ChildrenORString =
  | {
      children: React.ReactNode
      markdown?: never
    }
  | {
      markdown: string
      children?: never
    }
type TitleProps = VariantProps<typeof titleStyles> & ChildrenORString

/**
 * @description
 * This component can either be passed markdown with formatting or react nodes with text where the level decides the h tag.
 * @example `### Potential. **Unlocked.**`md ==> `h3>Potential. <strong>Unlocked.</strong></h3>`
 * @example `<Title level={3}>Potential. <strong>Unlocked.</strong></Title>` ==> `h3>Potential. <strong>Unlocked.</strong></h3>`
 */
const Title: React.FC<TitleProps> = ({ level, align, children, markdown }) => {
  if (markdown) {
    const headingLevel = markdown.startsWith("###")
      ? 3
      : markdown.startsWith("##")
        ? 2
        : 1

    return (
      <Markdown
        allowedElements={["h1", "h2", "h3", "b", "strong"]}
        remarkPlugins={[remarkGfm]}
        className={titleStyles({ level: headingLevel, align })}
      >
        {markdown}
      </Markdown>
    )
  }
  const Tag = `h${level || 2}` as keyof JSX.IntrinsicElements
  return <Tag className={titleStyles({ level, align })}>{children}</Tag>
}

export default Title
