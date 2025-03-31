"use server"

import { cookies } from "next/headers"

const COOKIE_CONSENT_KEY = "aw-consent"

export async function setCookieAction(formData: FormData) {
  // Get the consent value from the form data
  const consent = formData.get("consent")
  if (typeof consent !== "string") return
  // Get the cookies object from headers
  const cookieStore = cookies()

  // Set a cookie
  cookieStore.set(COOKIE_CONSENT_KEY, consent, {
    path: "/",
    httpOnly: true, // Recommended for security
    secure: true, // Only over HTTPS
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}
