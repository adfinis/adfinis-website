import React from "react"

type FormLabelProps = {
  id: string
  label: string
}

const FormLabel: React.FC<FormLabelProps> = ({ id, label }) => {
  return (
    <label
      htmlFor={id}
      className="font-bold text-input-primary uppercase text-14 tracking-wider select-none"
    >
      {label}
    </label>
  )
}

export default FormLabel
