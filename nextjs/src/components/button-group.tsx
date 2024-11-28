import { CTA } from "@/lib/cta"
import React from "react"
import Link from "./link"
import { cva, VariantProps } from "class-variance-authority"

const buttonGroupVariants = cva(["flex gap-4"], {
  variants: {
    align: {
      none: "",
      center: "mx-auto",
    },
  },
  defaultVariants: {
    align: "none",
  },
})

type ButtonGroupProps = VariantProps<typeof buttonGroupVariants> & {
  ctas: CTA[]
}
const ButtonGroup: React.FC<ButtonGroupProps> = ({ ctas, align }) => {
  return (
    <div className={buttonGroupVariants({ align })}>
      {ctas.map((cta, index) => (
        <Link key={index} href={cta.href} variant={cta.variant} size={cta.size}>
          {cta.text}
        </Link>
      ))}
    </div>
  )
}

export default ButtonGroup
