import React from "react"
import { useField, Field, ErrorMessage } from "formik"
import { getInputVariant, errorMessageClasses } from "./form-text"
import { cva } from "class-variance-authority"

type FormCheckboxProps = {
  id: string
  name: string
  label: string
}

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

const FormCheckbox: React.FC<FormCheckboxProps> = ({ id, name, label }) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="flex gap-2 relative">
      <Field
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
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
      <ErrorMessage
        name={name}
        component="p"
        className={errorMessageClasses()}
      />
    </div>
  )
}

export default FormCheckbox
