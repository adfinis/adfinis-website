import React from "react"
import { useField, Field, ErrorMessage } from "formik"
import { getInputVariant, fieldClasses, errorMessageClasses } from "./form-text"
import FormLabel from "./form-label"

type FormEmailProps = {
  id: string
  name: string
  label: string
}

const FormEmail: React.FC<FormEmailProps> = ({ id, name, label }) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <Field
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
        id={id}
        name={name}
        type="email"
        data-testid={id}
      />
      <ErrorMessage
        name={name}
        component="p"
        className={errorMessageClasses()}
        data-testid={`${id}-error`}
      />
    </div>
  )
}

export default FormEmail
