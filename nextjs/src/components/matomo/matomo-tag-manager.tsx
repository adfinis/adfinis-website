"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"

export const MatomoTagManager = ({ matomoSrc }: { matomoSrc: string }) => {
  const [hasConsent, setHasConsent] = useState<string | undefined>("initial")

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`))
      ?.split("=")[1]
    setHasConsent(consent)
  }, [])

  if (hasConsent !== "all") return null

  return (
    <Script id="matomo-tag-manager">
      {`
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({"mtm.startTime": (new Date().getTime()), "event": "mtm.Start"});
        (function() {
          var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
          g.async=true; g.src="${matomoSrc}"; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  )
}
