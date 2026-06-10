"use client"
import clsx from "clsx"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

const SPEED = 50 // marquee speed in pixels per second

type LogoSliderProps = {
  logos: {
    src: string
    alt: string
  }[]
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos }) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState(false)
  const [shift, setShift] = useState(0)

  /**
   * Measures the logos against the viewport to drive the marquee.
   *
   * A `ResizeObserver` (re)measures whenever the viewport or track resizes —
   * including when lazy-loaded logos finish loading and grow the track. Each
   * pass computes:
   * - `setWidth`: the intrinsic width of a single logo set (first to last
   *   logo), read even while the set overflows, to decide if it should scroll
   *   (`overflow`) or stay static and centered.
   * - `shift`: the exact seamless loop distance — the offset between a logo and
   *   its duplicate when the set is doubled — fed to the CSS marquee animation.
   *
   * `overflow` is a dependency so that after the set duplicates, the observer
   * re-runs and measures `shift` from the now-present second copy.
   */
  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const measure = () => {
      const items = track.children
      const first = items[0] as HTMLElement | undefined
      const lastOfSet = items[logos.length - 1] as HTMLElement | undefined
      if (!first || !lastOfSet) return
      // Intrinsic width of a single logo set (works while overflowing too).
      const setWidth =
        lastOfSet.offsetLeft + lastOfSet.offsetWidth - first.offsetLeft
      setOverflow(setWidth > viewport.clientWidth)
      // When the set is duplicated, the exact seamless loop distance is the gap
      // between a logo and its copy; otherwise the marquee is not running.
      const copy = items[logos.length] as HTMLElement | undefined
      setShift(copy ? copy.offsetLeft - first.offsetLeft : setWidth)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    return () => observer.disconnect()
  }, [logos.length, overflow])

  // Render the set twice only when it overflows, so the marquee can loop;
  // otherwise the logos fit and stay static and centered.
  const items = overflow ? [...logos, ...logos] : logos

  return (
    <div
      ref={viewportRef}
      data-testid="logo-slider"
      className="w-full overflow-hidden pt-2 pb-4"
    >
      <div
        ref={trackRef}
        className={clsx(
          "flex items-center gap-x-8 lg:gap-x-6 2xl:gap-x-12",
          overflow
            ? "animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
            : "justify-evenly",
        )}
        style={
          overflow
            ? ({
                "--marquee-shift": `${shift}px`,
                "--marquee-duration": `${shift / SPEED}s`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {items.map((logo, i) => (
          <Image
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={300}
            height={128}
            className="max-h-10 w-auto shrink-0 object-contain"
          />
        ))}
      </div>
    </div>
  )
}

export default LogoSlider
