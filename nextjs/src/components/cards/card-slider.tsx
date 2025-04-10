"use client"
import React, { useEffect, useRef, useState } from "react"
import type { Card } from "./card"
import Text from "../text"
import CardColored from "./card-colored"
import Link from "../link-button"
import CardSliderExplanation from "./card-slider-explanation"
import type { CTA } from "@/lib/cta"
import ButtonGroup from "../button-group"
import clsx from "clsx"
import IconChevronRight from "../icons/icon-chevron-right"
import IconChevronLeft from "../icons/icon-chevron-left"
import { useWindowSize } from "@uidotdev/usehooks"
import Title from "../title"

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

  const { width } = useWindowSize()
  const distance = width || 1500
  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  function scrollHorizontal(offset: number) {
    if (!sliderRef.current) return
    sliderRef.current.scrollLeft += offset
    setScrollPosition(sliderRef.current.scrollLeft)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrollHorizontal(-distance)
        }
      },
      {
        root: null, // Uses the viewport as the root
        rootMargin: "50px",
        threshold: 0.8, // Element is considered visible when at least 80% is in view
      },
    )

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = distance // Adjust this value as needed
      observer.observe(sliderRef.current)
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef?.current)
      }
    }
  }, [])

  return (
    <div className="w-topbar sm:-mx-8">
      <div className="flex flex-col items-start gap-8 flex-1 self-stretch pb-8 sm:hidden">
        <Title level={2} boldness={"semibold"}>
          {title}
        </Title>
        <Text markdown={description} />
      </div>

      <div className="hidden lg:block">
        {scrollPosition > 0 && (
          <button
            onClick={() => scrollHorizontal(-distance)}
            className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 left-6  flex items-center justify-center z-20"
          >
            <IconChevronLeft className="w-3.5 h-3.5 text-white" />
          </button>
        )}
        <button
          onClick={() => scrollHorizontal(distance)}
          className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 right-6 flex items-center justify-center z-20"
        >
          <IconChevronRight className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      <div
        data-scheme="light"
        className={clsx([
          "flex overflow-x-auto gap-x-6 snap-x snap-mandatory lg:snap-none overscroll-x-none scroll-smooth",
          "pt-2 pb-4 px-2 2xl:-mr-6",
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
