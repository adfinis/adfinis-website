"use server"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { cookies } from "next/headers"

export async function setCookieAction(formData: FormData) {
  // Get the consent value from the form data
  const consent = formData.get("consent")
  if (typeof consent !== "string") return
  // Get the cookies object from headers
  const cookieStore = cookies()

  // Set a cookie
  cookieStore.set(COOKIE_CONSENT_KEY, consent, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })
}

export async function hasCookie(name: string) {
  const cookieStore = cookies()
  return cookieStore.has(name)
}

export async function getCookie(name: string) {
  const cookieStore = cookies()
  return cookieStore.get(name)?.value
}
