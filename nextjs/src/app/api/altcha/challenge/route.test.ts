import { describe, expect, test, vi } from "vitest"

vi.stubEnv("ALTCHA_HMAC_KEY", "test-hmac-key-please-change-me")
vi.mock("server-only", () => ({}))

import { GET } from "./route"

describe("GET /api/altcha/challenge", () => {
  test("returns a JSON response with the challenge", async () => {
    const response = await GET()
    expect(response).toBeDefined()
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toHaveProperty("algorithm")
    expect(data).toHaveProperty("challenge")
    expect(data).toHaveProperty("salt")
    expect(data).toHaveProperty("signature")
    expect(data).toHaveProperty("maxnumber")

    expect(data.algorithm).toBe("SHA-256")
    expect(typeof data.challenge).toBe("string")
    expect(typeof data.salt).toBe("string")
    expect(typeof data.signature).toBe("string")
    expect(typeof data.maxnumber).toBe("number")
  })

  test("response includes Cache-Control: no-store header", async () => {
    const response = await GET()
    expect(response.headers.get("Cache-Control")).toBe("no-store")
  })

  test("returns 503 when ALTCHA_HMAC_KEY is missing", async () => {
    vi.stubEnv("ALTCHA_HMAC_KEY", "")
    const response = await GET()
    expect(response.status).toBe(503)
    expect(response.headers.get("Cache-Control")).toBe("no-store")

    const data = await response.json()
    expect(data).toEqual({ error: "Service unavailable" })
  })
})
