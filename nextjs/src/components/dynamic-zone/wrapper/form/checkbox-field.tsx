import { cva } from "class-variance-authority"
import { useId } from "react"
const errorMessageClasses =
  "absolute top-0 right-0 text-error text-14 text-right"

const fieldClasses = cva(
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

export default function CheckboxField({ name, label, errorMessage }) {
  const id = useId()

  return (
    <div className="flex gap-2 relative">
      <input
        className={fieldClasses({
          variant: errorMessage.length > 0 ? "error" : "default",
        })}
        id={id}
        name={name}
        type="checkbox"
      />
      <label
        htmlFor={id}
        className="select-none text-input-primary cursor-pointer"
      >
        {label}
      </label>
      {errorMessage.length > 0 && (
        <p className={errorMessageClasses}>{errorMessage[0]}</p>
      )}
    </div>
  )
}
