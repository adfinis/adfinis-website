import React from "react"

type FormLabelProps = {
  id: string
  label: string
}

const FormLabel: React.FC<FormLabelProps> = ({ id, label }) => {
  return (
    <label
      htmlFor={id}
      className="font-bold text-neutral uppercase text-14 tracking-wider"
    >
      {label}
    </label>
  )
}

export default FormLabel
