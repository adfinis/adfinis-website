import React from "react"
import Title from "../title"
import Text from "../text"
import { cva, VariantProps } from "class-variance-authority"

const sectionGroupStyles = cva(["grid gap-10 lg:gap-16"], {
  variants: {
    align: {
      start: "",
      center: "justify-start lg:justify-center",
    },
  },
  defaultVariants: {
    align: "start",
  },
})
type SectionGroupProps = VariantProps<typeof sectionGroupStyles> & {
  /**
   * @info should always be passed as markdown.
   *
   * @example `# Potential. **Unlocked.**`
   * @example `## Potential. **Unlocked.**`
   * @example `### Potential. **Unlocked.**`
   */
  title?: string
  text?: string
  children: React.ReactNode
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  title,
  text,
  children,
  align,
}) => {
  return (
    <div className={sectionGroupStyles({ align })}>
      {title && <Title align="center" boldness="light" markdown={title} />}
      {text && (
        <div className="max-w-[874px] grid gap-8">
          <Text markdown={text} className="text-justify lg:text-center" />
        </div>
      )}
      {children}
    </div>
  )
}

export default SectionGroup
