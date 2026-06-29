import "server-only"
import { createChallenge, verifySolution } from "altcha-lib"

function getHmacKey(): string {
  const HMAC_KEY = process.env.ALTCHA_HMAC_KEY
  if (!HMAC_KEY) {
    throw new Error("ALTCHA_HMAC_KEY is not configured")
  }
  return HMAC_KEY
}

export async function createAltchaChallenge() {
  return createChallenge({
    hmacKey: getHmacKey(),
    maxNumber: 100_000,
    expires: new Date(Date.now() + 10 * 60 * 1000),
  })
}

export async function verifyAltcha(
  payload: FormDataEntryValue | null,
): Promise<boolean> {
  if (typeof payload !== "string" || payload.length === 0) {
    return false
  }
  try {
    return await verifySolution(payload, getHmacKey(), true)
  } catch {
    return false
  }
}
