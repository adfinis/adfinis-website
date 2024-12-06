import React from "react"

type IconGroupProps = {
  children: React.ReactNode
}
const IconGroup: React.FC<IconGroupProps> = ({ children }) => {
  return <div className="flex gap-4">{children}</div>
}

export default IconGroup
