"use client"
import React, { useEffect, useRef, useState } from "react"
import Text from "../text"
import CardSliderExplanation from "./card-slider-explanation"
import type { CTA } from "@/lib/cta"
import ButtonGroup from "../button-group"
import clsx from "clsx"
import IconChevronRight from "../icons/icon-chevron-right"
import IconChevronLeft from "../icons/icon-chevron-left"
import Title from "../title"
import { cardSliderOffset } from "./card-slider-offset"

const SLIDE_IN_DISTANCE = 1500

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
  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  function page(direction: 1 | -1) {
    const slider = sliderRef.current
    if (!slider) return
    const padding = parseFloat(getComputedStyle(slider).paddingLeft)
    const { left, right } = slider.getBoundingClientRect()
    const cards = Array.from(slider.children, (card) =>
      card.getBoundingClientRect(),
    )
    const offset = cardSliderOffset(
      { left: left + padding, right: right - padding },
      cards,
      direction,
    )
    slider.scrollBy({ left: offset })
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          slider.scrollTo({ left: 0 })
        }
      },
      {
        root: null, // Uses the viewport as the root
        rootMargin: "50px",
        threshold: 0.8, // Element is considered visible when at least 80% is in view
      },
    )
    slider.scrollLeft = SLIDE_IN_DISTANCE
    observer.observe(slider)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="container relative px-0" data-testid="card-slider">
      <div className="flex flex-col items-start gap-8 flex-1 self-stretch pb-8 sm:hidden">
        <Title level={2} boldness={"semibold"}>
          {title}
        </Title>
        <Text markdown={description} />
      </div>

      <div className="hidden lg:block">
        {scrollPosition > 0 && (
          <button
            onClick={() => page(-1)}
            className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 left-6  flex items-center justify-center z-20"
          >
            <IconChevronLeft className="w-3.5 h-3.5 text-white" />
          </button>
        )}
        <button
          onClick={() => page(1)}
          className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 right-6 flex items-center justify-center z-20"
        >
          <IconChevronRight className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      <div
        data-scheme="light"
        className={clsx([
          "flex overflow-x-auto gap-x-6 snap-x snap-mandatory lg:snap-none overscroll-x-none scroll-smooth",
          "pt-2 pb-4 px-2 -mx-2 2xl:-mr-6",
        ])}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        ref={sliderRef}
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
