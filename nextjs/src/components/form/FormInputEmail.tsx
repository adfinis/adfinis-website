import clsx from "clsx"
import React from "react"

type FormInputEmailProps = {
  placeholder?: string
  label?: string
}
const FormInputEmail: React.FC<FormInputEmailProps> = ({
  placeholder,
  label,
}) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor="email"
        className="font-bold text-neutral uppercase text-14 tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id="email"
          name="email"
          type="email"
          placeholder={placeholder}
          className={clsx([
            "text-neutral text-16 leading-normal font-normal",
            "w-full rounded-md bg-white/10 border border-neutral/20 px-6 py-2",
            "focus:outline-1 focus:outline-neutral/70",
          ])}
        />
      </div>
    </div>
  )
}

export default FormInputEmail
