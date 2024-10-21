import { cva, VariantProps } from "class-variance-authority"
import React from "react"

const titleStyles = cva(["font-light tracking-tight text-title-primary"], {
  variants: {
    level: {
      1: "text-35 lg:text-50 leading-[30px] lg:leading-[50px]",
      2: "text-35 lg:text-40 leading-[30px] lg:leading-[45px]",
      3: "text-30 leading-[25px] lg:leading-[40px]",
    },
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: 2,
    align: "left",
  },
})
type TitleProps = VariantProps<typeof titleStyles> & {
  children: React.ReactNode
}

const Title: React.FC<TitleProps> = ({ level, align, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return <Tag className={titleStyles({ level, align })}>{children}</Tag>
}

export default Title
