import clsx from "clsx"
import React from "react"
import "./card-group.css"

type CardGroupProps = {
  columns?: 1 | 2
  smColumns?: 1 | 2 | 3
  mdColumns?: 1 | 2 | 3 | 4
  lgColumns?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  hasDividers?: boolean
  className?: string
  /**
   * @info defaults to`5xl` for backwards compatibility when nothing provided.
   */
  maxWidth?: "5xl" | "6xl" | "7xl" | "none"
}

/**
 * @description Wrapper component for a group of max. n CardIcon components
 */
const CardGroup: React.FC<CardGroupProps> = ({
  columns = 1,
  smColumns,
  mdColumns,
  lgColumns = 3,
  children,
  hasDividers,
  maxWidth = "5xl",
  className,
}) => {
  return (
    <div
      className={clsx([
        "grid gap-12 mx-auto",
        hasDividers && "card-group-dividers",
        className,
        {
          "grid-cols-1": columns === 1,
          "grid-cols-2": columns === 2,
          "sm:grid-cols-1": smColumns === 1,
          "sm:grid-cols-2": smColumns === 2,
          "sm:grid-cols-3": smColumns === 3,
          "md:grid-cols-1": mdColumns === 1,
          "md:grid-cols-2": mdColumns === 2,
          "md:grid-cols-3": mdColumns === 3,
          "md:grid-cols-4": mdColumns === 4,
          "lg:grid-cols-1": lgColumns === 1,
          "lg:grid-cols-2": lgColumns === 2,
          "lg:grid-cols-3": lgColumns === 3,
          "lg:grid-cols-4": lgColumns === 4,
          "lg:grid-cols-5": lgColumns === 5,
          "lg:grid-cols-6": lgColumns === 6,
        },
        {
          "max-w-5xl": maxWidth === "5xl",
          "max-w-6xl": maxWidth === "6xl",
          "max-w-7xl": maxWidth === "7xl",
          "max-w-none": maxWidth === "none",
        },
      ])}
    >
      {children}
    </div>
  )
}

export default CardGroup
