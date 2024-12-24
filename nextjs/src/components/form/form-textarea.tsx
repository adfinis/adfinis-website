import React from "react"
import { useField, Field, ErrorMessage } from "formik"
import { getInputVariant, fieldClasses, errorMessageClasses } from "./form-text"
import FormLabel from "./form-label"

type FormTextareaProps = {
  id: string
  name: string
  label: string
  rows?: number
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  label,
  rows = 5,
}) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <Field
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
        id={id}
        name={name}
        as="textarea"
        rows={rows}
      />
      <ErrorMessage
        name={name}
        component="p"
        className={errorMessageClasses()}
      />
    </div>
  )
}

export default FormTextarea
