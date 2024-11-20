import React from "react"

type CardIconGroupProps = {
  children: React.ReactNode
}
const CardIconGroup: React.FC<CardIconGroupProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
      {children}
    </div>
  )
}

export default CardIconGroup
