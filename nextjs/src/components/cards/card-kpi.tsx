import React from "react"
import { type Card } from "./card"
import Image from "next/image"
import { colors } from "@/lib/colors"
import { cva, VariantProps } from "class-variance-authority"

const cardKpiStyles = cva(
  [
    "rounded-full h-48 lg:h-64 w-48 lg:w-64 grid gap-3 lg:gap-6 place-content-center",
  ],
  {
    variants: {
      color: {
        white: "bg-white",
        stone: "bg-stone",
        biscay: "bg-biscay",
        sapphire: "bg-sapphire",
        jumbo: "bg-jumbo",
        neutral: "bg-neutral",
        sunglow: "bg-sunglow",
        sky: "bg-sky",
        cinnamon: "bg-cinnamon",
        green: "bg-green",
        razzmatazz: "bg-razzmatazz",
        fuchsia: "bg-fuchsia",
        manhattan: "bg-manhattan",
      },
    },
    defaultVariants: {
      color: "sapphire",
    },
  },
)

type CardKpiProps = VariantProps<typeof cardKpiStyles> & Card

const CardKpi: React.FC<CardKpiProps> = ({
  title,
  description,
  imageUrl,
  color,
}) => {
  return (
    <div className={cardKpiStyles({ color })}>
      {imageUrl && (
        <Image
          className="w-15 h-15 mx-auto"
          width={60}
          height={60}
          src={imageUrl}
          alt={title}
        />
      )}
      <h3 className="grid gap-1 justify-items-center leading-none text-white font-semibold text-40 tracking-wider">
        <span>{title}</span>
        <span className="uppercase text-12 font-normal">{description}</span>
      </h3>
    </div>
  )
}

export default CardKpi
