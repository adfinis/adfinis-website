"use client"

import { useSyncExternalStore } from "react"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"

export const CONSENT_UNKNOWN = "initial"
const subscribe = () => () => {}

function readConsent(): string | undefined {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`))
      ?.split("=")[1] || undefined
  )
}

export function useConsent(): string | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => CONSENT_UNKNOWN)
}
