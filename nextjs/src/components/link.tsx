import { cva, VariantProps } from "class-variance-authority"
import Link, { type LinkProps } from "next/link"
import { twMerge } from "tailwind-merge"
import IconChevronLeft from "./icons/icon-chevron-left"
import IconChevronRight from "./icons/icon-chevron-right"

import { buttonStyles } from "./button"

type linkType = VariantProps<typeof buttonStyles> &
  LinkProps & {
    children?: React.ReactNode
    className?: string
  }

const Button = ({
  variant,
  size,
  chevron,
  disabled,
  className,
  children,
  ...props
}: linkType) => {
  return (
    <Link
      {...props}
      className={twMerge(
        buttonStyles({ variant, size, chevron, disabled }),
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={Boolean(disabled)}
    >
      {chevron === "left" && <IconChevronLeft />}
      {children}
      {chevron === "right" && <IconChevronRight />}
    </Link>
  )
}

export default Button
