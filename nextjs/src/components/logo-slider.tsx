"use client"
import clsx from "clsx"
import Image from "next/image"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import IconChevronLeft from "./icons/icon-chevron-left"
import IconChevronRight from "./icons/icon-chevron-right"

type LogoSliderProps = {
  logos: {
    src: string
    alt: string
  }[]
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos }) => {
  const { width } = useWindowSize()
  const distance = width || 1500
  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hasOverflow, setHasOverflow] = useState(false)

  function scrollHorizontal(offset: number, duration = 600) {
    if (!sliderRef.current) return
    const el = sliderRef.current
    const start = el.scrollLeft
    const target = start + offset
    const startTime = performance.now()

    function step(now: number) {
      if (!sliderRef.current) return
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      sliderRef.current.scrollLeft = start + (target - start) * eased
      setScrollPosition(sliderRef.current.scrollLeft)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const checkOverflow = useCallback(() => {
    if (!sliderRef.current) return
    setHasOverflow(
      sliderRef.current.scrollWidth > sliderRef.current.clientWidth,
    )
  }, [])

  useEffect(() => {
    checkOverflow()
  }, [width, logos.length, checkOverflow])

  useEffect(() => {
    if (!sliderRef.current) return
    const el = sliderRef.current
    const resizeObserver = new ResizeObserver(() => checkOverflow())
    resizeObserver.observe(el)
    Array.from(el.children).forEach((child) => resizeObserver.observe(child))
    return () => resizeObserver.disconnect()
  }, [logos.length, checkOverflow])

  useEffect(() => {
    if (!hasOverflow || !sliderRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrollHorizontal(-distance, 2500)
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 1,
      },
    )

    sliderRef.current.scrollLeft = distance
    observer.observe(sliderRef.current)

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current)
      }
    }
  }, [hasOverflow])

  return (
    <div className="relative w-topbar sm:-mx-8 lg:w-screen lg:mx-[calc(50%-50vw)]">
      <div className="hidden lg:block">
        {hasOverflow && scrollPosition > 0 && (
          <button
            onClick={() => scrollHorizontal(-distance)}
            className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 left-6 flex items-center justify-center z-20"
          >
            <IconChevronLeft className="w-3.5 h-3.5 text-white" />
          </button>
        )}
        {hasOverflow && (
          <button
            onClick={() => scrollHorizontal(distance)}
            className="bg-jumbo/90 p-3.5 rounded-full absolute top-1/2 -translate-y-1/2 right-6 flex items-center justify-center z-20"
          >
            <IconChevronRight className="w-3.5 h-3.5 text-white" />
          </button>
        )}
      </div>

      <div
        ref={sliderRef}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        className={clsx([
          "flex overflow-x-auto gap-x-8 lg:gap-x-6 overscroll-x-none items-center",
          "pt-2 pb-4 px-2 2xl:-mr-6",
          !hasOverflow && "justify-evenly",
        ])}
      >
        {logos.map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={300}
            height={128}
            onLoad={checkOverflow}
            className="flex-shrink-0 max-h-10 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  )
}

export default LogoSlider
