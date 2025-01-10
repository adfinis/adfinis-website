import React from "react"
import CardImage from "../cards/card-image"
import { CTA } from "@/lib/cta"
import Link from "../link-button"
import ButtonGroup from "../button-group"
import clsx from "clsx"
import { colors } from "@/lib/colors"

type SectionMediaWideProps = {
  reverse?: boolean
  children: React.ReactNode
  /**
   * @info if an image is passed, the component will use the image instead of childrenWide
   */
  image?: {
    src: string
    alt: string
  }
  color?: keyof typeof colors
  ctas?: CTA[]
  /**
   * @info childrenWide is an alternative to image. It can be any component
   */
  childrenWide?: React.ReactNode
}
const SectionCardWide: React.FC<SectionMediaWideProps> = ({
  reverse,
  image,
  color,
  children,
  childrenWide,
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
        {(image && (
          <CardImage
            className="w-full lg:max-h-[25vw]"
            src={image.src}
            alt={image.alt || ""}
            color={color}
          />
        )) ||
          childrenWide}
      </span>

      <div className="w-full lg:w-5/12 grid gap-6 pt-8 lg:p-8 xl:p-12 justify-items-start">
        {children}
        {ctas && ctas.length > 0 && (
          <div>
            <ButtonGroup ctas={ctas} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionCardWide
