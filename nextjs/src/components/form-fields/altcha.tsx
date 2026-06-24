"use client"

import { useEffect } from "react"
import { errorMessageClasses } from "@/components/form-fields/class-names"

type Props = {
  errorMessage?: string[]
}

export default function Altcha({ errorMessage = [] }: Props) {
  useEffect(() => {
    // Register the <altcha-widget> custom element once on the client.
    import("altcha").catch((error) => {
      console.error("Failed to load Altcha widget", error)
    })
  }, [])

  return (
    <div className="grid gap-2 relative">
      {/* @ts-expect-error - <altcha-widget> is a custom element */}
      <altcha-widget
        challenge="/api/altcha/challenge"
        name="altcha"
        hidefooter
        auto="onload"
      />
      {errorMessage.length > 0 && (
        <p className={errorMessageClasses}>{errorMessage[0]}</p>
      )}
    </div>
  )
}
