"use client"

import { useEffect, useRef } from "react"

// Numeric conversion rule id, exposed to the client so lintrk can fire the
// same conversion the server-side CAPI reports (LinkedIn deduplicates the two)
const CONVERSION_ID = Number(process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID)

export function useLinkedInConversion(state: {
  success: boolean
  conversionId?: string
}): void {
  const firedFor = useRef<object | null>(null)

  useEffect(() => {
    if (!state.success || !state.conversionId) return
    if (!Number.isFinite(CONVERSION_ID)) return
    if (firedFor.current === state) return
    firedFor.current = state
    window.lintrk?.("track", { conversion_id: CONVERSION_ID })
  }, [state])
}
