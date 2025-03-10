import { cva, VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import React, { type ReactNode } from "react"

import IconChevronLeft from "./icons/icon-chevron-left"
import IconChevronRight from "./icons/icon-chevron-right"

export const buttonStyles = cva(
  [
    "cursor-pointer transition-all duration-150 ease-in-out transform",
    "hover:shadow-2",
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
        cta: "min-w-40 px-10 bg-sunglow text-stone hover:bg-gradient-to-r hover:from-stone/10 hover:to-stone/10",
        primary:
          "min-w-40 px-10 text-button-primary bg-button-primary hover:bg-gradient-to-r hover:from-stone/40 hover:to-stone/40",
        secondary:
          "min-w-40 px-10 border bg-none text-button-secondary border-button-secondary hover:bg-gradient-to-r hover:from-sapphire/10 hover:to-sapphire/10",
        text: "text-button-secondary px-4 hover:bg-gradient-to-r hover:from-sapphire/10 hover:to-sapphire/10",
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
      {chevron === "left" && <IconChevronLeft className="h-2.5 w-auto" />}
      {children}
      {chevron === "right" && <IconChevronRight className="h-2.5 w-auto" />}
    </button>
  )
}

export default Button
