"use client"

import { useEffect, useRef } from "react"

const CONVERSION_ID = Number(
  process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID_PIXEL,
)

export function useLinkedInConversion(state: {
  success: boolean
  conversionId?: string
}): void {
  const firedFor = useRef<string | null>(null)

  useEffect(() => {
    if (!state.success || !state.conversionId) return
    if (!Number.isInteger(CONVERSION_ID) || CONVERSION_ID <= 0) return
    if (firedFor.current === state.conversionId) return
    firedFor.current = state.conversionId
    window.lintrk?.("track", {
      conversion_id: CONVERSION_ID,
      event_id: state.conversionId,
    })
  }, [state])
}
