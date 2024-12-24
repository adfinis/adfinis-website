import clsx from "clsx"
import React from "react"

interface FormColumnsProps {
  children: React.ReactNode
}

const FormColumns: React.FC<FormColumnsProps> = ({ children }) => {
  return <div className={clsx(["grid lg:grid-flow-col gap-4"])}>{children}</div>
}

export default FormColumns
