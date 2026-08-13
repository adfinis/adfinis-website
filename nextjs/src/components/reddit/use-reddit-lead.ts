"use client"

import { useEffect, useRef } from "react"

export function useRedditLead(state: {
  success: boolean
  conversionId?: string
}): void {
  const firedFor = useRef<object | null>(null)

  useEffect(() => {
    if (!state.success || !state.conversionId) return
    if (firedFor.current === state) return
    firedFor.current = state
    window.rdt?.("track", "Lead", { conversion_id: state.conversionId })
  }, [state])
}
