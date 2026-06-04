"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function MatomoPixel({ url, siteId }: { url: string; siteId: string }) {
  const pathname = usePathname()
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams({
      idsite: siteId,
      rec: "1",
      bots: "1",
      rand: crypto.randomUUID(),
    })

    setSrc(`${url}/matomo.php?${params.toString()}`)
  }, [pathname, url, siteId])

  if (!src) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt=""
      width={1}
      height={1}
      referrerPolicy="no-referrer"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  )
}
