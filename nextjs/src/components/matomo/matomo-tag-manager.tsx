"use client"

import Script from "next/script"
import { useConsent } from "@/hooks/useConsent"

export const MatomoTagManager = ({ matomoSrc }: { matomoSrc: string }) => {
  const hasConsent = useConsent()

  if (hasConsent !== "all") return null

  return (
    <Script
      src={matomoSrc}
      strategy="afterInteractive"
      onLoad={() => {
        const _mtm = ((window as any)._mtm = (window as any)._mtm || [])
        _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" })
      }}
    />
  )
}
