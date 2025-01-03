import React from "react"
import { useField, Field, ErrorMessage } from "formik"
import { getInputVariant, fieldClasses, errorMessageClasses } from "./form-text"
import FormLabel from "./form-label"

type FormSelectProps = {
  id: string
  name: string
  label: string
  options: {
    value: string
    label: string
  }[]
}

const getLabel = (label: string) => {}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  options,
}) => {
  const [, meta] = useField({ name, id })

  return (
    <div className="grid gap-2 relative">
      <FormLabel id={id} label={label} />
      <Field
        as="select"
        className={fieldClasses({ variant: getInputVariant({ meta }) })}
        id={id}
        name={name}
        data-testid={id}
      >
        <option></option>
        {options.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="p"
        className={errorMessageClasses()}
        data-testid={`${id}-error`}
      />
    </div>
  )
}

export default FormSelect
