import { FC } from "react"

type FormLabelProps = {
  id: string
  label: string
}

const FormLabel: FC<FormLabelProps> = ({ id, label }) => {
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
