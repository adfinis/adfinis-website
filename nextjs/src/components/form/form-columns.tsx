import clsx from "clsx"
import { ReactNode, FC } from "react"

interface FormColumnsProps {
  children: ReactNode
}

const FormColumns: FC<FormColumnsProps> = ({ children }) => {
  return <div className={clsx(["grid lg:grid-flow-col gap-4"])}>{children}</div>
}

export default FormColumns
