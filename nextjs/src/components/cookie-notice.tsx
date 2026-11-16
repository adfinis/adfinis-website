"use client"

import { Locale } from "@/lib/locale"
import Button from "./button"
import Text from "./text"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { getDictionary } from "@/lib/get-dictionary.client"
import { useConsent } from "@/hooks/useConsent"
import { useEffect, useState } from "react"
import clsx from "clsx"
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react"

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

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") event.preventDefault()
  if (event.key === "Enter" && !isInteractive(event.target)) saveConsent("all")
}

const stayOpen = () => {}

const CookieNotice: React.FC<{ locale: Locale }> = ({ locale }) => {
  const hasConsent = useConsent()
  const dictionary = getDictionary(locale)
  const [focusHasMoved, setFocusHasMoved] = useState(false)

  useEffect(() => {
    if (hasConsent) return
    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [hasConsent])

  if (hasConsent) return null

  return (
    <Dialog open onClose={stayOpen} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-stone/60 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          data-scheme="dark"
          className="w-full max-w-2xl rounded-2xl border-t-8 border-sunglow bg-biscay p-6 sm:p-10 lg:p-12 grid gap-8 shadow-2xl"
        >
          <Description as="div">
            <Text markdown={dictionary.cookieBanner.text} />
          </Description>
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
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CookieNotice
