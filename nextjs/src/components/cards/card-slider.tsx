import React from "react"
import type { Card } from "./card"
import Text from "../text"
import CardColored from "./card-colored"
import Link from "../link-button"
import CardSliderExplanation from "./card-slider-explanation"
import type { CTA } from "@/lib/cta"
import ButtonGroup from "../button-group"
import clsx from "clsx"

type CardSliderProps = {
  title: string
  description: string
  ctas: CTA[]
  children: React.ReactNode
}
const CardSlider: React.FC<CardSliderProps> = ({
  title,
  description,
  ctas,
  children,
}) => {
  /**
   * @info -mx-8 is a correction for the Container.tsx component (sm:px-2), in order to prevent a scrollbar from appearing
   * The reason is w-topbar's calculation, in some edge cases slightly being bigger than the container.
   * @see Container.tsx for additional details
   */
  return (
    <div className="w-topbar sm:-mx-8">
      <div className="flex flex-col items-start gap-8 flex-1 self-stretch pb-8 sm:hidden">
        <h3 className="text-30 font-semibold text-biscay">{title}</h3>
        <Text markdown={description} />
      </div>

      <div
        className={clsx([
          "flex overflow-x-auto gap-x-6 snap-x snap-mandatory lg:snap-none overscroll-x-none",
          "pt-2 pb-4 px-2 2xl:-mr-6",
        ])}
      >
        <CardSliderExplanation title={title} description={description}>
          <ButtonGroup ctas={ctas} />
        </CardSliderExplanation>
        {children}
      </div>
      <div className="sm:hidden mt-8">{<ButtonGroup ctas={ctas} />}</div>
    </div>
  )
}

export default CardSlider
