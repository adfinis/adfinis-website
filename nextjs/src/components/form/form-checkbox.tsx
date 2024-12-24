import React from "react"
import { useField, Field, ErrorMessage } from "formik"
import { getInputVariant, errorMessageClasses } from "./form-text"
import FormLabel from "./form-label"
import { cva } from "class-variance-authority"

type FormCheckboxProps = {
  id: string
  name: string
  label: string
}

const fieldClasses = cva(
  [
    "bg-input-primary",
    "text-input-primary text-16 leading-normal font-normal rounded-lg w-6 h-6",
    "border border-input-primary",
    "ring-0 active:ring-1 ring-offset-1 active:ring-input-primary focus:ring-input-primary",
    "col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto",
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

const FormCheckbox: React.FC<FormCheckboxProps> = ({ id, name, label }) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="flex gap-2 relative">
      <Field
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
        id={id}
        name={name}
        type="checkbox"
        checked={meta.value}
      />
      <label htmlFor={id} className="select-none text-input-primary">
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
