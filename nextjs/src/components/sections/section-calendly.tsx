"use client"

import React, { useEffect, useState } from "react"
import { InlineWidget, useCalendlyEventListener } from "react-calendly"

type SectionCalendlyProps = {
  url: string
  onEventScheduled?: () => void
}
const SectionCalendly: React.FC<SectionCalendlyProps> = ({
  url,
  onEventScheduled,
}) => {
  useCalendlyEventListener({
    onEventScheduled: () => {
      onEventScheduled && onEventScheduled()
    },
  })

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  let height = "670px"
  switch (true) {
    case width < 640:
      height = "1050px"
      break
    case width < 1024:
      height = "1100px"
      break
    default:
      height = "670px"
  }

  return (
    /**
     * @info ugly hack for accounting inaccessible calendly iframe margins
     */
    <div className="lg:pt-4 md:-mt-[66px] md:-mb-[30px] lg:-mt-[132px] lg:-mb-[60px]">
      <InlineWidget styles={{ height }} url={url} />
    </div>
  )
}

export default SectionCalendly
