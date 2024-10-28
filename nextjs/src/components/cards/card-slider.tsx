import React from "react"
import type { Card } from "./card"
import Text from "../text"
import CardColored from "./card-colored"
import Link from "../link"
import CardSliderExplanation from "./card-slider-explanation"
import type { CTA } from "@/lib/actions"
import ButtonGroup from "../button-group"

type CardSliderProps = {
  title: string
  description: string
  ctas: CTA[]
  cards: Card[]
}
const CardSlider: React.FC<CardSliderProps> = ({
  title,
  description,
  ctas,
  cards,
}) => {
  return (
    <div className="w-topbar ml-auto">
      <div className="flex flex-col items-start gap-8 flex-1 self-stretch pt-6 pb-8 sm:hidden">
        <h3 className="text-30 font-semibold text-biscay">{title}</h3>
        <Text markdown={description} />
      </div>

      <div className="flex overflow-x-auto gap-x-6 snap-x snap-mandatory lg:snap-none pb-4 overscroll-x-none">
        <CardSliderExplanation title={title} description={description}>
          <ButtonGroup ctas={ctas} />
        </CardSliderExplanation>

        {cards.map((card, index) => {
          return (
            <div key={index} className="flex-shrink-0 snap-center">
              <CardColored
                color={card.color}
                title={card.title}
                description={card.description}
              />
            </div>
          )
        })}
      </div>
      <div className="sm:hidden mt-8">{<ButtonGroup ctas={ctas} />}</div>
    </div>
  )
}

export default CardSlider