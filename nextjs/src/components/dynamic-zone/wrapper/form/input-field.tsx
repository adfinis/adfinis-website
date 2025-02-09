import FormLabel from "@/components/form/form-label"
import { useId } from "react"
import { cva } from "class-variance-authority"

const fieldClasses = cva(
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

const errorMessageClasses =
  "absolute top-0 right-0 text-error text-14 text-right"

type Props = {
  name: string
  label: string
  errorMessage: string[]
}
export default function InputField({ name, label, errorMessage }: Props) {
  const id = useId()
  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <input
        type="text"
        name={name}
        id={id}
        className={fieldClasses({
          variant: errorMessage.length > 0 ? "error" : "default",
        })}
      />
      {errorMessage.length > 0 && (
        <p className={errorMessageClasses}>Field is required</p>
      )}
    </div>
  )
}
