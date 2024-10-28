import { CTA } from "@/lib/actions"
import React from "react"
import Link from "./link"

type ButtonGroupProps = {
  ctas: CTA[]
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({ ctas }) => {
  return (
    <div className="flex gap-4">
      {ctas.map((cta, index) => (
        <Link key={index} href={cta.href} variant={cta.variant} size={cta.size}>
          {cta.text}
        </Link>
      ))}
    </div>
  )
}

export default ButtonGroup
