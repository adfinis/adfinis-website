"use client"

import { useEffect, useState } from "react"

/**
 * Swaps between views with a fade out / fade in.
 *
 * When `target` changes, `visible` turns false straight away (fade out). Once
 * `duration` has passed, `shown` switches to the new target, which makes
 * `visible` true again (fade in). Users who prefer reduced motion get the new
 * view immediately.
 */
export function useFadeSwap<T>(target: T, duration = 300) {
  const [shown, setShown] = useState(target)

  useEffect(() => {
    if (target === shown) {
      return
    }

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const timeout = setTimeout(
      () => setShown(target),
      reduceMotion ? 0 : duration,
    )
    return () => clearTimeout(timeout)
  }, [target, shown, duration])

  return { shown, visible: shown === target }
}
