"use client"

import { Locale } from "@/lib/locale"
import Button from "./button"
import Text from "./text"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { getDictionary } from "@/lib/get-dictionary.client"
import { useState, useEffect } from "react"

const CookieNotice: React.FC<{ locale: Locale }> = ({ locale }) => {
  const [hasConsent, setHasConsent] = useState<string | undefined>("initial")

  const dictionary = getDictionary(locale)

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`))
      ?.split("=")[1]
    setHasConsent(consent)
  }, [])

  if (hasConsent) return null

  const handleConsent = (consentType: "functional" | "all") => {
    document.cookie = `${COOKIE_CONSENT_KEY}=${consentType}; expires=${new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ).toUTCString()}; path=/`
    setHasConsent(consentType)
    window.location.reload()
  }

  return (
    <div
      data-scheme="dark"
      className="rounded-lg p-4 w-full max-w-2xl bg-biscay grid gap-4 fixed z-50 bottom-4 right-4"
    >
      <Text className="text-14" markdown={dictionary.cookieBanner.text} />
      <span className="flex flex-wrap justify-between gap-4">
        <div />
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={"secondary"}
            onClick={() => handleConsent("functional")}
          >
            {dictionary.cookieBanner.reject}
          </Button>
          <Button variant={"cta"} onClick={() => handleConsent("all")}>
            {dictionary.cookieBanner.accept}
          </Button>
        </div>
      </span>
    </div>
  )
}

export default CookieNotice
