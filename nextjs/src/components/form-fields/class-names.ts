import { cva } from "class-variance-authority"

export const errorMessageClasses =
  "absolute top-0 right-0 text-error text-14 text-right"

export const inputClasses = cva(
  [
    "bg-input-primary/5",
    "text-input-primary text-16 leading-normal font-normal w-full rounded-md px-4 py-2",
    "border",
    "ring-0 active:!ring-0 focus:!ring-0", // resets blue border of chrome when active. This is replaced with the active: modifiers below
    "focus:border-input-primary active:border-input-primary",
  ],
  {
    variants: {
      variant: {
        default: "border-input-primary/20",
        error: "border-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export const checkboxClasses = cva(
  [
    "cursor-pointer",
    "text-16 checked:text-checkbox-primary",
    "leading-normal font-normal rounded-lg w-6 h-6",
    "border",
    "focus:border focus:border-checkbox-primary/20",
    "active:border-none",
    "focus:active:border",
    "checked:border checked:border-checkbox-primary",
    "ring-0 ring-offset-0",
    "active:ring-1 active:ring-offset-2 active:ring-offset-checkbox-primary active:ring-checkbox-primary",
    "focus:ring-1 focus:ring-offset-2 focus:ring-offset-checkbox-primary focus:ring-checkbox-primary",
    "checked:ring-0 checked:border-0",
  ],
  {
    variants: {
      variant: {
        default: "border-checkbox-primary/20",
        error: "border-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
