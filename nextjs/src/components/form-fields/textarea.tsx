import FormLabel from "@/components/form/form-label"
import { useId } from "react"
import {
  errorMessageClasses,
  inputClasses,
} from "@/components/form-fields/class-names"

type Props = {
  name: string
  label: string
  rows?: number
  errorMessage: string[]
}

export default function Textarea({
  name,
  label,
  errorMessage,
  rows = 5,
}: Props) {
  const id = useId()
  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <textarea
        className={inputClasses({
          variant: errorMessage.length > 0 ? "error" : "default",
        })}
        id={id}
        name={name}
        rows={rows}
      />
      {errorMessage.length > 0 && (
        <p className={errorMessageClasses}>{errorMessage[0]}</p>
      )}
    </div>
  )
}
