import FormLabel from "@/components/form/form-label"
import { useId } from "react"
import {
  errorMessageClasses,
  inputClasses,
} from "@/components/form-fields/class-names"

type Props = {
  name: string
  label: string
  errorMessage: string[]
}

export default function Input({ name, label, errorMessage }: Props) {
  const id = useId()
  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <input
        type="text"
        name={name}
        id={id}
        className={inputClasses({
          variant: errorMessage.length > 0 ? "error" : "default",
        })}
      />
      {errorMessage.length > 0 && (
        <p className={errorMessageClasses}>{errorMessage[0]}</p>
      )}
    </div>
  )
}
