import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))

import {
  GoogleAdsCapiTracker,
  parseServiceAccountJson,
  type GoogleAdsCapiConfig,
} from "./google-ads-capi"
import type { ClickId } from "./click-id"

const baseConfig: GoogleAdsCapiConfig = {
  ingestUrl: "https://datamanager.googleapis.com/v1/events:ingest",
  tokenUrl: "https://oauth2.googleapis.com/token",
  serviceAccountEmail: "uploader@maxl-ads-api.iam.gserviceaccount.com",
  serviceAccountKey: "",
  customerId: "6320295794",
  conversionActionId: "987654321",
  enabled: true,
  debug: false,
}

// SHA-256 of "john@example.com" (already lowercase/trimmed)
const HASHED_EMAIL =
  "855f96e983f1f8e8be944692b6f719fd54329826cb62e98015efee8e2e071dd4"

const CLICK_ID: ClickId = { type: "gclid", value: "Cj0KCQjwTEST" }

const input = (overrides = {}) => ({
  transactionId: "t-1",
  clickId: CLICK_ID,
  email: "john@example.com",
  ...overrides,
})

const tokenResponse = {
  ok: true,
  status: 200,
  json: async () => ({ access_token: "access-token" }),
  text: async () => "",
}

const ingestResponse = { ok: true, status: 200, text: async () => "" }

// The token exchange is always the first call, the ingest the second.
function mockFetch() {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce(tokenResponse)
    .mockResolvedValue(ingestResponse)
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

function ingestBody(fetchMock: ReturnType<typeof vi.fn>, call = 1) {
  const [url, init] = fetchMock.mock.calls[call]
  return { url, init, body: JSON.parse(init.body) }
}

let publicKey: CryptoKey

function toPem(der: ArrayBuffer) {
  const lines =
    Buffer.from(der)
      .toString("base64")
      .match(/.{1,64}/g) ?? []
  return `-----BEGIN PRIVATE KEY-----\n${lines.join("\n")}\n-----END PRIVATE KEY-----\n`
}

function fromBase64Url(value: string) {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64")
}

beforeAll(async () => {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )
  publicKey = pair.publicKey
  baseConfig.serviceAccountKey = toPem(
    await crypto.subtle.exportKey("pkcs8", pair.privateKey),
  )
})

describe("parseServiceAccountJson", () => {
  test("reads the email and key from a key file", () => {
    const raw = JSON.stringify({
      client_email: "a@b.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n",
    })
    expect(parseServiceAccountJson(raw)).toEqual({
      email: "a@b.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n",
    })
  })

  test("accepts the key file as a base64 string", () => {
    const raw = Buffer.from(
      JSON.stringify({
        client_email: "a@b.iam.gserviceaccount.com",
        private_key: "pem",
      }),
    ).toString("base64")
    expect(parseServiceAccountJson(raw)).toEqual({
      email: "a@b.iam.gserviceaccount.com",
      key: "pem",
    })
  })

  test("returns empty values when unset or malformed", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(parseServiceAccountJson(undefined)).toEqual({ email: "", key: "" })
    expect(parseServiceAccountJson("{not json")).toEqual({ email: "", key: "" })
    expect(parseServiceAccountJson("{}")).toEqual({ email: "", key: "" })
    errorSpy.mockRestore()
  })
})

describe("GoogleAdsCapiTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  test("does not fire when disabled", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker({ ...baseConfig, enabled: false })
    await tracker.trackConversion(input())
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test.each([
    ["serviceAccountEmail", { serviceAccountEmail: "" }],
    ["serviceAccountKey", { serviceAccountKey: "" }],
    ["customerId", { customerId: "" }],
  ])("does not fire without a %s", async (_name, override) => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker({ ...baseConfig, ...override })
    await tracker.trackConversion(input())
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("does not fire without a conversion action id", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker({
      ...baseConfig,
      conversionActionId: "",
    })
    await tracker.trackConversion(input())
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("does not fire without a click id", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ clickId: undefined }))
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("posts the destination, hashed email, click id and consent", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(
      input({ eventAt: new Date("2026-09-01T09:41:12.000Z") }),
    )

    const { url, init, body } = ingestBody(fetchMock)
    expect(url).toBe("https://datamanager.googleapis.com/v1/events:ingest")
    expect(init.headers.Authorization).toBe("Bearer access-token")
    expect(init.headers["Content-Type"]).toBe("application/json")

    expect(body.destinations).toEqual([
      {
        operatingAccount: {
          accountType: "GOOGLE_ADS",
          accountId: "6320295794",
        },
        productDestinationId: "987654321",
      },
    ])
    expect(body.encoding).toBe("HEX")
    expect(body.events).toHaveLength(1)
    expect(body.events[0]).toEqual({
      transactionId: "t-1",
      eventTimestamp: "2026-09-01T09:41:12.000Z",
      eventSource: "WEB",
      consent: {
        adUserData: "CONSENT_GRANTED",
        adPersonalization: "CONSENT_GRANTED",
      },
      userData: { userIdentifiers: [{ emailAddress: HASHED_EMAIL }] },
      adIdentifiers: { gclid: "Cj0KCQjwTEST" },
    })
  })

  test.each([
    ["gbraid" as const, "GB123"],
    ["wbraid" as const, "WB456"],
  ])("puts a %s in the matching adIdentifiers field", async (type, value) => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ clickId: { type, value } }))
    const { body } = ingestBody(fetchMock)
    expect(body.events[0].adIdentifiers).toEqual({ [type]: value })
  })

  test("normalises the email before hashing", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ email: "  JOHN@Example.com " }))
    const { body } = ingestBody(fetchMock)
    expect(body.events[0].userData.userIdentifiers).toEqual([
      { emailAddress: HASHED_EMAIL },
    ])
  })

  test("sends a hashed phone number when it is already E.164", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ phone: "+41 79 123 45 67" }))
    const { body } = ingestBody(fetchMock)
    expect(body.events[0].userData.userIdentifiers).toHaveLength(2)
    expect(body.events[0].userData.userIdentifiers[1].phoneNumber).toMatch(
      /^[0-9a-f]{64}$/,
    )
  })

  test("drops a phone number that has no country code", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ phone: "0791234567" }))
    const { body } = ingestBody(fetchMock)
    expect(body.events[0].userData.userIdentifiers).toEqual([
      { emailAddress: HASHED_EMAIL },
    ])
  })

  test("sends a click-id-only event when there is no email", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input({ email: undefined }))
    const { body } = ingestBody(fetchMock)
    expect(body.events[0].userData).toBeUndefined()
    expect(body.events[0].adIdentifiers).toEqual({ gclid: "Cj0KCQjwTEST" })
  })

  test("signs a service account JWT and exchanges it for an access token", async () => {
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await tracker.trackConversion(input())

    const [tokenUrl, tokenInit] = fetchMock.mock.calls[0]
    expect(tokenUrl).toBe("https://oauth2.googleapis.com/token")
    expect(tokenInit.headers["Content-Type"]).toBe(
      "application/x-www-form-urlencoded",
    )
    const params = Object.fromEntries(new URLSearchParams(tokenInit.body))
    expect(params.grant_type).toBe(
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    )

    const [header, claims, signature] = params.assertion.split(".")
    expect(JSON.parse(fromBase64Url(header).toString())).toEqual({
      alg: "RS256",
      typ: "JWT",
    })
    const parsedClaims = JSON.parse(fromBase64Url(claims).toString())
    expect(parsedClaims).toMatchObject({
      iss: "uploader@maxl-ads-api.iam.gserviceaccount.com",
      scope: "https://www.googleapis.com/auth/datamanager",
      aud: "https://oauth2.googleapis.com/token",
    })
    expect(parsedClaims.exp - parsedClaims.iat).toBe(3600)
    expect(
      await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        publicKey,
        fromBase64Url(signature),
        new TextEncoder().encode(`${header}.${claims}`),
      ),
    ).toBe(true)
  })

  test("makes no ingest call when the key cannot be parsed", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = mockFetch()
    const tracker = new GoogleAdsCapiTracker({
      ...baseConfig,
      serviceAccountKey:
        "-----BEGIN PRIVATE KEY-----\nnope\n-----END PRIVATE KEY-----",
    })
    await expect(tracker.trackConversion(input())).resolves.toBeUndefined()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalled()
  })

  test("makes no ingest call when the token exchange fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => "invalid_grant",
    })
    vi.stubGlobal("fetch", fetchMock)

    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await expect(tracker.trackConversion(input())).resolves.toBeUndefined()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalled()
  })

  test("logs and resolves when the ingest returns a non-2xx", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(tokenResponse)
      .mockResolvedValue({
        ok: false,
        status: 400,
        text: async () => "bad request",
      })
    vi.stubGlobal("fetch", fetchMock)

    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await expect(tracker.trackConversion(input())).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith(
      "Google Ads CAPI tracking failed: 400 bad request",
    )
  })

  test("logs and resolves when the ingest throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(tokenResponse)
      .mockRejectedValue(new Error("network down"))
    vi.stubGlobal("fetch", fetchMock)

    const tracker = new GoogleAdsCapiTracker(baseConfig)
    await expect(tracker.trackConversion(input())).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith(
      "Google Ads CAPI tracking error:",
      expect.any(Error),
    )
  })
})
