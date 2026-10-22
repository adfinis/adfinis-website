import clsx from "clsx"
import React from "react"

type LinkAnimationProps = {
  children: React.ReactNode
}

const LinkAnimation: React.FC<LinkAnimationProps> = ({ children }) => {
  return (
    <span
      className={clsx([
        "transition-all duration-300 ease-out",
        "text-white bg-linear-to-r from-sunglow/60 to-sunglow group-hover:text-sunglow",
        "bg-bottom-left bg-size-[0%_2px] bg-no-repeat group-hover:bg-size-[100%_2px]",
      ])}
    >
      {children}
    </span>
  )
}

export default LinkAnimation
