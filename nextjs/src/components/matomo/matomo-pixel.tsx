"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

export function MatomoPixel({ url, siteId }: { url: string; siteId: string }) {
  const pathname = usePathname()

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const src = useMemo(() => {
    const params = new URLSearchParams({
      idsite: siteId,
      rec: "1",
      bots: "1",
      rand: crypto.randomUUID(),
    })

    return `${url}/matomo.php?${params.toString()}`
  }, [pathname])

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
