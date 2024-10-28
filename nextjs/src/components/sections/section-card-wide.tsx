import React from "react"
import CardImage from "../cards/card-image"
import { CTA } from "@/lib/actions"
import Link from "../link"
import ButtonGroup from "../button-group"
import clsx from "clsx"

type SectionMediaWideProps = {
  reverse: boolean
  children: React.ReactNode
  image: {
    src: string
    alt: string
  }
  ctas: CTA[]
}
const SectionCardWide: React.FC<SectionMediaWideProps> = ({
  reverse,
  image,
  children,
  ctas,
}) => {
  return (
    <div
      className={clsx([
        "flex flex-wrap items-center",
        (reverse && "lg:flex-row-reverse") || "",
      ])}
    >
      <span className="w-full lg:w-7/12">
        <CardImage
          className="w-full lg:max-h-[25vw]"
          src={image.src}
          alt={image.alt}
        />
      </span>

      <div className="w-full lg:w-5/12 grid gap-6 pt-8 lg:p-8 xl:p-12">
        {children}
        <div>
          <ButtonGroup ctas={ctas} />
        </div>
      </div>
    </div>
  )
}

export default SectionCardWide