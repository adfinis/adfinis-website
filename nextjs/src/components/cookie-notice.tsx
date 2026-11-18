"use client"

import { Locale } from "@/lib/locale"
import Button from "./button"
import Text from "./text"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { getDictionary } from "@/lib/get-dictionary.client"
import { useConsent } from "@/hooks/useConsent"
import { KeyboardEvent, useId, useState } from "react"
import clsx from "clsx"

const whiteFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-biscay"
const yellowRing =
  "ring-2 ring-sunglow/50 ring-offset-2 ring-offset-biscay focus-visible:outline-none"
const pulsingRing =
  "relative after:pointer-events-none after:absolute after:-inset-1 after:rounded-full after:border-2 after:border-sunglow after:opacity-0 after:will-change-transform motion-safe:after:animate-ring-pulse"

const saveConsent = (consentType: "functional" | "all") => {
  document.cookie = `${COOKIE_CONSENT_KEY}=${consentType}; expires=${new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; path=/`
  window.location.reload()
}

const isInteractive = (target: EventTarget | null) =>
  target instanceof Element &&
  target.closest("a, button, input, select, textarea") !== null

const acceptOnEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !isInteractive(event.target)) saveConsent("all")
}

const CookieNotice: React.FC<{ locale: Locale }> = ({ locale }) => {
  const hasConsent = useConsent()
  const dictionary = getDictionary(locale)
  const [focusHasMoved, setFocusHasMoved] = useState(false)
  const textId = useId()

  if (hasConsent) return null

  return (
    <div
      data-scheme="dark"
      role="dialog"
      aria-describedby={textId}
      onKeyDown={acceptOnEnter}
      className="sticky bottom-0 z-40 flex lg:items-center max-h-[50dvh] overflow-y-auto lg:max-h-none lg:min-h-[25vh] border-t-8 border-sunglow bg-biscay shadow-2xl"
    >
      <div className="container max-w-5xl w-full px-4 py-6 lg:py-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div id={textId}>
          <Text markdown={dictionary.cookieBanner.text} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            size="large"
            variant="secondary"
            className={whiteFocusRing}
            onClick={() => saveConsent("functional")}
          >
            {dictionary.cookieBanner.reject}
          </Button>
          <Button
            size="large"
            variant="cta"
            autoFocus
            className={clsx(
              yellowRing,
              pulsingRing,
              focusHasMoved && whiteFocusRing,
            )}
            onBlur={() => document.hasFocus() && setFocusHasMoved(true)}
            onClick={() => saveConsent("all")}
          >
            {dictionary.cookieBanner.accept}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CookieNotice
