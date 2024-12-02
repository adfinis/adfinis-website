import clsx from "clsx"
import React from "react"
import "./card-group.css"

type CardGroupProps = {
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  hasDividers?: boolean
}

/**
 * @description Wrapper component for a group of max. n CardIcon components
 */
const CardGroup: React.FC<CardGroupProps> = ({
  columns = 3,
  children,
  hasDividers,
}) => {
  return (
    <div
      className={clsx([
        "grid grid-cols-1 gap-12 max-w-5xl mx-auto",
        hasDividers && "card-group-dividers",
        {
          "lg:grid-cols-1": columns === 1,
          "lg:grid-cols-2": columns === 2,
          "lg:grid-cols-3": columns === 3,
          "lg:grid-cols-4": columns === 4,
          "lg:grid-cols-5": columns === 5,
          "lg:grid-cols-6": columns === 6,
        },
      ])}
    >
      {children}
    </div>
  )
}

export default CardGroup
