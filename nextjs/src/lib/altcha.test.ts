import { beforeEach, describe, expect, test, vi } from "vitest"
import { solveChallenge } from "altcha-lib"

vi.stubEnv("ALTCHA_HMAC_KEY", "test-hmac-key-please-change-me")

// Mock server-only to allow testing in jsdom environment
vi.mock("server-only", () => ({}))

import { createAltchaChallenge, verifyAltcha } from "./altcha"

describe("altcha", () => {
  beforeEach(() => {
    vi.stubEnv("ALTCHA_HMAC_KEY", "test-hmac-key-please-change-me")
  })

  test("createAltchaChallenge returns a signed challenge", async () => {
    const challenge = await createAltchaChallenge()
    expect(challenge.algorithm).toBe("SHA-256")
    expect(typeof challenge.challenge).toBe("string")
    expect(typeof challenge.salt).toBe("string")
    expect(typeof challenge.signature).toBe("string")
    expect(typeof challenge.maxnumber).toBe("number")
  })

  test("verifyAltcha returns true for a valid solved payload", async () => {
    const challenge = await createAltchaChallenge()
    const solveResult = solveChallenge(
      challenge.challenge,
      challenge.salt,
      challenge.algorithm,
      challenge.maxnumber,
    )
    const solution = await solveResult.promise
    const payload = Buffer.from(
      JSON.stringify({
        algorithm: challenge.algorithm,
        challenge: challenge.challenge,
        number: solution!.number,
        salt: challenge.salt,
        signature: challenge.signature,
      }),
    ).toString("base64")

    await expect(verifyAltcha(payload)).resolves.toBe(true)
  })

  test("verifyAltcha returns false for null", async () => {
    await expect(verifyAltcha(null)).resolves.toBe(false)
  })

  test("verifyAltcha returns false for a bogus string", async () => {
    await expect(verifyAltcha("not-a-real-payload")).resolves.toBe(false)
  })

  test("verifyAltcha returns false when signature is tampered", async () => {
    const challenge = await createAltchaChallenge()
    const solveResult = solveChallenge(
      challenge.challenge,
      challenge.salt,
      challenge.algorithm,
      challenge.maxnumber,
    )
    const solution = await solveResult.promise
    const payload = Buffer.from(
      JSON.stringify({
        algorithm: challenge.algorithm,
        challenge: challenge.challenge,
        number: solution!.number,
        salt: challenge.salt,
        signature: "0".repeat(64),
      }),
    ).toString("base64")

    await expect(verifyAltcha(payload)).resolves.toBe(false)
  })
})
