import { useId } from "react"
import {
  checkboxClasses,
  errorMessageClasses,
} from "@/components/form-fields/class-names"

export default function Checkbox({ name, label, errorMessage }) {
  const id = useId()
  return (
    <div className="flex gap-2 relative">
      <input
        className={checkboxClasses({
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
