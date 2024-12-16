import clsx from "clsx"
import React from "react"

type FormInputGroupProps = {
  columns?: 1 | 2 | 3
  legend?: string
  children: React.ReactNode
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  columns = 1,
  legend,
  children,
}) => {
  return (
    <fieldset>
      {legend && <legend>{legend}</legend>}
      <div
        className={clsx([
          "grid gap-4",
          {
            "lg:grid-cols-1": columns === 1,
            "lg:grid-cols-2": columns === 2,
            "lg:grid-cols-3": columns === 3,
          },
        ])}
      >
        {children}
      </div>
    </fieldset>
  )
}

export default FormInputGroup
