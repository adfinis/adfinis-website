import { cva, VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import React, { type ReactNode } from "react"

import IconChevronLeft from "./icons/icon-chevron-left"
import IconChevronRight from "./icons/icon-chevron-right"

export const buttonStyles = cva(
  [
    "hover:shadow-2 hover:bg-gradient-to-r hover:from-stone/10 hover:to-stone/10",
    "inline-flex justify-center items-center rounded-full",
    "text-14 leading-none uppercase font-bold",
    "gap-2.5",
  ],
  {
    variants: {
      size: {
        small: "h-[40px]",
        large: "h-[50px]",
      },
      variant: {
        cta: "min-w-40 px-10 bg-sunglow text-stone",
        primary:
          "min-w-40 px-10 text-[var(--text-primary)] bg-[var(--bg-primary)]",
        secondary:
          "min-w-40 px-10 border bg-none text-[var(--text-secondary)] border-[var(--text-secondary)]",
        text: "text-[var(--text-secondary)] px-4",
      },
      chevron: {
        left: "",
        right: "",
        none: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "small",
      chevron: "none",
    },
  },
)

type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    children?: ReactNode
  }

const Button: React.FC<ButtonProps> = ({
  className,
  size,
  variant,
  chevron,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        buttonStyles({ variant, size, chevron, disabled }),
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {chevron === "left" && <IconChevronLeft />}
      {children}
      {chevron === "right" && <IconChevronRight />}
    </button>
  )
}

export default Button
