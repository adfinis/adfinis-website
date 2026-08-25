"use client"

import { useEffect, useRef } from "react"

type Props = {
  message: string
}

export default function SubmitErrorMessage({ message }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    ref.current?.scrollIntoView?.({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [])

  return (
    <p
      ref={ref}
      role="alert"
      className="rounded-md border border-error bg-[rgb(var(--color-error)/0.08)] px-4 py-3 text-left text-error text-16 motion-safe:animate-fade-slide-in"
    >
      {message}
    </p>
  )
}
