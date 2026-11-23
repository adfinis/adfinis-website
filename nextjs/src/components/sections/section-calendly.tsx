"use client"

import React from "react"
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

  return (
    <div className="w-[calc(100vw-2rem)] max-w-5xl lg:pt-4 md:mt-[-66px] md:mb-[-30px] lg:mt-[-102px] lg:mb-[-60px]">
      <div className="h-[1050px] sm:h-[1100px] lg:h-[670px]">
        <InlineWidget styles={{ height: "100%" }} url={url} />
      </div>
    </div>
  )
}

export default SectionCalendly
