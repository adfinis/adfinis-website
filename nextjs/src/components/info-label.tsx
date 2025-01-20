import clsx from "clsx"
import React from "react"

const InfoLabel: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <label
      className={clsx([
        "text-title-primary uppercase font-semibold tracking-wider text-12",
        className,
      ])}
    >
      {text}
    </label>
  )
}
export default InfoLabel
