"use client"

import { useEffect, useRef } from "react"

type Props = {
  message: string
  prompt: string
  link: string
  onSubmitAnother: () => void
}

export default function FormConfirmation({
  message,
  prompt,
  link,
  onSubmitAnother,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    ref.current?.scrollIntoView?.({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [])

  return (
    <div
      ref={ref}
      role="status"
      className="w-full text-center text-input-primary py-8 motion-safe:animate-fade-slide-in"
      data-testid="form-confirmation"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{message}</h2>
      <p className="mt-4">
        {prompt}{" "}
        <button
          type="button"
          onClick={onSubmitAnother}
          className="font-bold underline hover:no-underline"
        >
          {link}
        </button>
      </p>
    </div>
  )
}
