import { Field, ErrorMessage, useField, type FieldMetaProps } from "formik"
import React from "react"
import FormLabel from "./form-label"
import { cva } from "class-variance-authority"

type FormTextProps = {
  id: string
  name: string
  label: string
}

export const fieldClasses = cva(
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

export const errorMessageClasses = cva(
  "absolute top-0 right-0 text-error text-14 text-right",
)

export const getInputVariant = ({ meta }: { meta: FieldMetaProps<any> }) => {
  if (meta.touched && meta.error) return "error"
  return "default"
}

const FormText: React.FC<FormTextProps> = ({ id, name, label }) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <Field
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
        id={id}
        name={name}
        type="text"
      />
      <ErrorMessage
        name={name}
        component="p"
        className={errorMessageClasses()}
      />
    </div>
  )
}

export default FormText
