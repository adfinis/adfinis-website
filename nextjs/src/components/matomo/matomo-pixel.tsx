"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

export function MatomoPixel() {
  const pathname = usePathname()

  const src = useMemo(() => {
    const params = new URLSearchParams({
      idsite: "1",
      rec: "1",
      bots: "1",
      rand: crypto.randomUUID(),
    })

    return `https://analytics.example.nl/matomo.php?${params.toString()}`
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
