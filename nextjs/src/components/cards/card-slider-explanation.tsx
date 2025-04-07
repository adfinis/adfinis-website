import { CTA } from "@/lib/cta"
import React from "react"
import Text from "../text"
import Title from "../title"

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
      <Title level={3} boldness={"semibold"}>
        {title}
      </Title>
      <Text markdown={description} className="min-w-96 flex-1" />
      <div className="flex gap-4">{children}</div>
    </div>
  )
}

export default CardSliderExplanation
