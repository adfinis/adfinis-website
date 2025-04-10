import React from "react"
import Title from "../title"
import Text from "../text"
import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"
import "./section-group.css"

const sectionGroupStyles = cva(["grid gap-12 lg:gap-16"], {
  variants: {
    /**
     * @deprecated this property will most likely be removed in the future.
     * we already align by default to center now.
     * These classes will be moved to the shared section styles when we don't
     * want to add back support for other align values.
     */
    align: {
      center: "justify-center justify-items-center",
    },
    hasDividers: {
      true: "section-group-dividers",
    },
    columns: {
      2: "max-w-4xl grid-cols-1 md:grid-cols-2 mx-auto",
      3: "max-w-4xl grid-cols-1 md:grid-cols-3 mx-auto",
    },
  },
  defaultVariants: {
    align: "center",
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
  columns?: 2 | 3
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  title,
  text,
  children,
  /**
   * @deprecated this property will most likely be removed in the future.
   * we already align by default to center now.
   */
  align,
  hasDividers,
  columns,
  ...attrs
}) => {
  return (
    <div
      className={sectionGroupStyles({ align })}
      data-component="SectionGroup"
      {...attrs}
    >
      {title && <Title align="center" boldness="light" markdown={title} />}
      {text && (
        <div
          className={clsx([
            "max-w-4xl grid gap-8",
            {
              "mx-auto": align === "center",
            },
          ])}
        >
          <Text markdown={text} className="text-center" />
        </div>
      )}
      <div className={sectionGroupStyles({ hasDividers, columns, align })}>
        {children}
      </div>
    </div>
  )
}

export default SectionGroup
