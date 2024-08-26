import clsx from "clsx"
import Link from "next/link"
import React from "react"

import ChevronLeft from "./chevron-left"
import ChevronRight from "./chevron-right"

interface ButtonProps {
  onClick?: () => void
  link: string
  size: "small" | "large"
  type: "cta" | "primary" | "secondary" | "text"
  disabled?: boolean
  chevron?: "left" | "right"
  children: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  link,
  size,
  type,
  chevron,
  disabled,
  children,
}) => {
  return (
    <Link
      onClick={onClick}
      href={link}
      className={clsx(
        "hover:shadow-2 hover:bg-gradient-to-r hover:from-stone/10 hover:to-stone/10",
        "inline-flex justify-center py-2.5  rounded-full",
        {
          "bg-sunglow": type === "cta",
          "bg-[var(--bg-primary)]": type === "primary",
          "border bg-none border-[var(--text-secondary)]": type === "secondary",
          "opacity-50 cursor-not-allowed pointer-events-none": disabled,
          "px-4": type === "text",
          "min-w-40 px-10": type !== "text",
        },
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <span
        className={clsx(
          "text-14 uppercase font-bold flex items-center gap-2.5",
          {
            "text-stone": type === "cta",
            "text-[var(--text-primary)]": type === "primary",
            "text-[var(--text-secondary)]":
              type === "secondary" || type === "text",
            "h-5": size === "small",
            "h-8": size === "large",
          },
        )}
      >
        {chevron === "left" && <ChevronLeft />}
        {children}
        {chevron === "right" && <ChevronRight />}
      </span>
    </Link>
  )
}

export default Button
