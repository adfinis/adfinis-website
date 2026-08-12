"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useConsent } from "@/hooks/useConsent"

declare global {
  interface Window {
    rdt?: (...args: unknown[]) => void
  }
}

export function RedditPixel({ pixelId }: { pixelId: string }) {
  const hasConsent = useConsent()
  const pathname = usePathname()
  const isFirstNavigation = useRef(true)

  useEffect(() => {
    if (hasConsent !== "all") return
    // The inline snippet already fires PageVisit on initial load; only
    // re-fire on subsequent App Router client navigations
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false
      return
    }
    window.rdt?.("track", "PageVisit")
  }, [pathname, hasConsent])

  if (hasConsent !== "all") return null

  return (
    <Script
      id="reddit-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${pixelId}');rdt('track','PageVisit');`,
      }}
    />
  )
}
