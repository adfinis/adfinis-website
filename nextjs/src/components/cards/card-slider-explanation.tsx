import { CTA } from "@/lib/cta"
import React from "react"
import Text from "../text"

type CardExplanationProps = {
  title: string
  description: string
  children: React.ReactNode
}

const CardSliderExplanation: React.FC<CardExplanationProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div
      data-component="CardSliderExplanation"
      className="snap-center hidden sm:flex flex-col items-start gap-8 pt-6 self-stretch px-6 pb-8 rounded-xl bg-white shadow-2 max-w-md"
    >
      <h2 className="text-30 font-semibold leading-none text-biscay">
        {title}
      </h2>
      <Text markdown={description} className="min-w-96 flex-1" />
      <div className="flex gap-4">{children}</div>
    </div>
  )
}

export default CardSliderExplanation
