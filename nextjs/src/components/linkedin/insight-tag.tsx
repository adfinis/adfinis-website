"use client"

import Script from "next/script"
import { useConsent } from "@/hooks/useConsent"

declare global {
  interface Window {
    lintrk?: (...args: unknown[]) => void
    _linkedin_data_partner_ids?: string[]
  }
}

export function InsightTag({ partnerId }: { partnerId: string }) {
  const hasConsent = useConsent()

  if (hasConsent !== "all") return null

  return (
    <Script
      id="linkedin-insight-tag"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `_linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`,
      }}
    />
  )
}
