import { beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))

import { LinkedInCapiTracker, type LinkedInCapiConfig } from "./linkedin-capi"

const baseConfig: LinkedInCapiConfig = {
  capiUrl: "https://api.linkedin.com/rest/conversionEvents",
  apiVersion: "202608",
  enabled: true,
  accessToken: "test-token",
  conversionId: "12345678",
  debug: false,
}

// SHA-256 of "john@example.com" (already lowercase/trimmed)
const HASHED_EMAIL =
  "855f96e983f1f8e8be944692b6f719fd54329826cb62e98015efee8e2e071dd4"

function mockFetch() {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 })
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

describe("LinkedInCapiTracker", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  test("does not fire when disabled", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker({ ...baseConfig, enabled: false })
    await tracker.trackConversion({ eventId: "e1", email: "john@example.com" })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("does not fire without an access token", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker({ ...baseConfig, accessToken: "" })
    await tracker.trackConversion({ eventId: "e1", email: "john@example.com" })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("does not fire without a conversion id", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker({ ...baseConfig, conversionId: "" })
    await tracker.trackConversion({ eventId: "e1", email: "john@example.com" })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("does not fire when there is no user identifier", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker(baseConfig)
    await tracker.trackConversion({ eventId: "e1" })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test("posts a hashed email, li_fat_id and the conversion URN with the right headers", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker(baseConfig)
    await tracker.trackConversion({
      eventId: "event-abc",
      email: "  John@Example.com  ",
      liFatId: "fat-123",
      eventAt: new Date("2026-08-17T00:00:00.000Z"),
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("https://api.linkedin.com/rest/conversionEvents")
    expect(init.method).toBe("POST")
    expect(init.headers.Authorization).toBe("Bearer test-token")
    expect(init.headers["LinkedIn-Version"]).toBe("202608")
    expect(init.headers["X-Restli-Protocol-Version"]).toBe("2.0.0")

    const body = JSON.parse(init.body)
    expect(body.conversion).toBe("urn:lla:llaPartnerConversion:12345678")
    expect(body.eventId).toBe("event-abc")
    expect(body.conversionHappenedAt).toBe(
      new Date("2026-08-17T00:00:00.000Z").getTime(),
    )
    expect(body.user.userIds).toEqual([
      { idType: "SHA256_EMAIL", idValue: HASHED_EMAIL },
      {
        idType: "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID",
        idValue: "fat-123",
      },
    ])
  })

  test("includes PLAINTEXT_IP_ADDRESS and userInfo when provided", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker(baseConfig)
    await tracker.trackConversion({
      eventId: "e1",
      email: "john@example.com",
      ipAddress: "203.0.113.7",
      userInfo: {
        firstName: "John",
        lastName: "Doe",
        companyName: "Adfinis",
        title: "Engineer",
      },
    })

    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.user.userIds).toEqual([
      { idType: "SHA256_EMAIL", idValue: HASHED_EMAIL },
      { idType: "PLAINTEXT_IP_ADDRESS", idValue: "203.0.113.7" },
    ])
    expect(body.user.userInfo).toEqual({
      firstName: "John",
      lastName: "Doe",
      companyName: "Adfinis",
      title: "Engineer",
    })
  })

  test("sends userInfo with an empty userIds list when there is no id", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker(baseConfig)
    await tracker.trackConversion({
      eventId: "e1",
      userInfo: { firstName: "John", lastName: "Doe" },
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.user.userIds).toEqual([])
    expect(body.user.userInfo).toEqual({ firstName: "John", lastName: "Doe" })
  })

  test("does not double-prefix an id that is already a full URN", async () => {
    const fetchMock = mockFetch()
    const tracker = new LinkedInCapiTracker({
      ...baseConfig,
      conversionId: "urn:lla:llaPartnerConversion:99",
    })
    await tracker.trackConversion({ eventId: "e1", email: "john@example.com" })
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.conversion).toBe("urn:lla:llaPartnerConversion:99")
  })

  test("logs the status and response body on a non-2xx, without throwing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      text: () => Promise.resolve("Validation failed because [{field=user}]"),
    })
    vi.stubGlobal("fetch", fetchMock)
    const tracker = new LinkedInCapiTracker(baseConfig)

    await expect(
      tracker.trackConversion({ eventId: "e1", email: "john@example.com" }),
    ).resolves.toBeUndefined()

    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy.mock.calls[0][0]).toContain("422")
    expect(errorSpy.mock.calls[0][0]).toContain("Validation failed because")
  })

  test("logs a thrown fetch error, without throwing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"))
    vi.stubGlobal("fetch", fetchMock)
    const tracker = new LinkedInCapiTracker(baseConfig)

    await expect(
      tracker.trackConversion({ eventId: "e1", email: "john@example.com" }),
    ).resolves.toBeUndefined()

    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy.mock.calls[0][0]).toContain("LinkedIn CAPI tracking error")
  })
})
