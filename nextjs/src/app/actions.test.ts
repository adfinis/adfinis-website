import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))
vi.mock("@/lib/formspark-submit", () => ({ default: vi.fn() }))
vi.mock("@/lib/altcha", () => ({ verifyAltcha: vi.fn() }))
vi.mock("@/lib/strapi", () => ({ strapiFetch: vi.fn() }))
vi.mock("next/headers", () => ({
  headers: vi.fn(
    async () => new Headers({ referer: "https://localhost:3000/en/contact" }),
  ),
  cookies: vi.fn(async () => ({
    get: (name: string) =>
      name === "aw-consents" ? { value: "all" } : undefined,
  })),
}))
vi.mock("@/lib/reddit-capi", () => ({
  redditCapi: { trackLead: vi.fn() },
}))
vi.mock("@/lib/linkedin-capi", () => ({
  linkedinCapi: { trackConversion: vi.fn() },
}))
// Capture the after() callbacks' promises so tests can await tracking side
// effects (the callbacks are async and otherwise fire-and-forget).
const afterHold = vi.hoisted(() => ({ promises: [] as Promise<unknown>[] }))
vi.mock("next/server", () => ({
  after: (fn: () => unknown) => {
    afterHold.promises.push(Promise.resolve().then(fn))
  },
}))

import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { strapiFetch } from "@/lib/strapi"
import { cookies, headers } from "next/headers"
import { linkedinCapi } from "@/lib/linkedin-capi"
import { redditCapi } from "@/lib/reddit-capi"
import { runFormAction } from "@/lib/form-actions-shared"
import {
  saveSimpleForm,
  saveStandardForm,
  saveContactForm,
  saveEventForm,
  saveRaffleForm,
} from "./actions"

const mockStrapiFetch = vi.mocked(strapiFetch)
const mockFormsparkSubmit = vi.mocked(formsparkSubmit)
const mockVerifyAltcha = vi.mocked(verifyAltcha)
const mockCookies = vi.mocked(cookies)
const mockHeaders = vi.mocked(headers)
const mockTrackConversion = vi.mocked(linkedinCapi.trackConversion)
const mockTrackLead = vi.mocked(redditCapi.trackLead)

function headersWith(extra: Record<string, string>) {
  return new Headers({
    referer: "https://localhost:3000/en/contact",
    ...extra,
  })
}

async function flushAfter() {
  await Promise.all(afterHold.promises)
  afterHold.promises = []
}

function consentCookies(value?: string) {
  return {
    get: (name: string) =>
      name === "aw-consents" && value != null ? { value } : undefined,
  } as never
}

const lastPayload = () =>
  mockFormsparkSubmit.mock.calls.at(-1)?.[0] as Record<string, unknown>

function base(): FormData {
  const fd = new FormData()
  fd.set("firstName", "John")
  fd.set("lastName", "Doe")
  fd.set("email", "john@example.com")
  fd.set("privacy_policy", "on")
  fd.set("altcha", "solved")
  return fd
}
function withCompany(fd: FormData): FormData {
  fd.set("company_name", "Adfinis")
  fd.set("job_function", "Engineer")
  return fd
}

beforeEach(() => {
  vi.clearAllMocks()
  afterHold.promises = []
  mockVerifyAltcha.mockResolvedValue(true)
  mockStrapiFetch.mockResolvedValue(undefined as never)
  mockFormsparkSubmit.mockResolvedValue(undefined as never)
  // Default: full consent. Individual tests override to exercise the gate.
  mockCookies.mockResolvedValue(consentCookies("all"))
  mockHeaders.mockResolvedValue(headersWith({}))
})

describe("saveSimpleForm", () => {
  test("happy path submits with type 'short', forced privacy_policy and from_url", async () => {
    const result = await saveSimpleForm("en", { success: false }, base())
    expect(result.success).toBe(true)
    expect(mockStrapiFetch).toHaveBeenCalledTimes(1)
    expect(mockFormsparkSubmit).toHaveBeenCalledTimes(1)
    expect(lastPayload().type).toBe("short")
    expect(lastPayload().privacy_policy).toBe("yes")
    expect(lastPayload().from_url).toBe("/en/contact")
  })

  test("altcha failure returns altcha error and does not submit", async () => {
    mockVerifyAltcha.mockResolvedValue(false)
    const result = await saveSimpleForm("en", { success: false }, base())
    expect(result.success).toBe(false)
    expect(result.errors?.altcha).toBeDefined()
    expect(mockStrapiFetch).not.toHaveBeenCalled()
  })

  test("validation failure returns snake_case errors and camel/snake values", async () => {
    const fd = base()
    fd.set("firstName", "")
    const result = await saveSimpleForm("en", { success: false }, fd)
    expect(result.success).toBe(false)
    expect(result.errors?.first_name).toBeDefined()
    expect(result.values?.firstName).toBe("")
    expect(result.values?.privacy_policy).toBe(true)
  })

  test("backend failure returns values without errors", async () => {
    mockStrapiFetch.mockRejectedValue(new Error("strapi down"))
    const result = await saveSimpleForm("en", { success: false }, base())
    expect(result.success).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.values?.email).toBe("john@example.com")
  })
})

describe("saveStandardForm", () => {
  test("happy path with trimmed company_name", async () => {
    const fd = withCompany(base())
    fd.set("company_name", "  Adfinis  ")
    const result = await saveStandardForm("en", { success: false }, fd)
    expect(result.success).toBe(true)
    expect(lastPayload().type).toBe("standard")
    expect(lastPayload().company_name).toBe("Adfinis")
  })

  test("missing company_name fails validation", async () => {
    const result = await saveStandardForm("en", { success: false }, base())
    expect(result.success).toBe(false)
    expect(result.errors?.company_name).toBeDefined()
  })
})

describe("saveContactForm", () => {
  test("happy path includes message and type 'contact'", async () => {
    const fd = withCompany(base())
    fd.set("message", "Hello there")
    const result = await saveContactForm("en", { success: false }, fd)
    expect(result.success).toBe(true)
    expect(lastPayload().type).toBe("contact")
    expect(lastPayload().message).toBe("Hello there")
  })

  test("missing message fails validation", async () => {
    const fd = withCompany(base())
    const result = await saveContactForm("en", { success: false }, fd)
    expect(result.success).toBe(false)
    expect(result.errors?.message).toBeDefined()
  })
})

describe("saveEventForm", () => {
  function eventFd(): FormData {
    const fd = withCompany(base())
    fd.set("message", "See you there")
    return fd
  }

  test("happy path with valid optional phone, type 'event'", async () => {
    const fd = eventFd()
    fd.set("phone_number", "+41791234567")
    const result = await saveEventForm("en", { success: false }, fd)
    expect(result.success).toBe(true)
    expect(lastPayload().type).toBe("event")
  })

  test("empty phone is allowed", async () => {
    const fd = eventFd()
    fd.set("phone_number", "") // the form always renders the input, so submits ""
    const result = await saveEventForm("en", { success: false }, fd)
    expect(result.success).toBe(true)
  })

  test("malformed phone fails with format message", async () => {
    const fd = eventFd()
    fd.set("phone_number", "12-34-abc")
    const result = await saveEventForm("en", { success: false }, fd)
    expect(result.success).toBe(false)
    expect(result.errors?.phone_number).toBeDefined()
  })

  test("too-short phone fails", async () => {
    const fd = eventFd()
    fd.set("phone_number", "1234")
    const result = await saveEventForm("en", { success: false }, fd)
    expect(result.success).toBe(false)
    expect(result.errors?.phone_number).toBeDefined()
  })

  test("too-long phone fails", async () => {
    const fd = eventFd()
    fd.set("phone_number", "1234567890123456")
    const result = await saveEventForm("en", { success: false }, fd)
    expect(result.success).toBe(false)
    expect(result.errors?.phone_number).toBeDefined()
  })
})

describe("saveRaffleForm", () => {
  test("unchecked agree_to_receive_mail fails validation", async () => {
    const result = await saveRaffleForm(
      "en",
      { success: false },
      withCompany(base()),
    )
    expect(result.success).toBe(false)
    expect(result.errors?.agree_to_receive_mail).toBeDefined()
  })

  test("happy path excludes agree_to_receive_mail from payload", async () => {
    const fd = withCompany(base())
    fd.set("agree_to_receive_mail", "on")
    const result = await saveRaffleForm("en", { success: false }, fd)
    expect(result.success).toBe(true)
    expect(lastPayload().type).toBe("raffle")
    expect("agree_to_receive_mail" in lastPayload()).toBe(false)
  })
})

describe("CAPI consent gating (fail-closed)", () => {
  function contactFd(): FormData {
    const fd = withCompany(base())
    fd.set("message", "Hello there")
    return fd
  }

  test("fires both CAPIs on a successful submit with full consent", async () => {
    const result = await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(result.success).toBe(true)
    expect(mockTrackConversion).toHaveBeenCalledTimes(1)
    expect(mockTrackLead).toHaveBeenCalledTimes(1)
  })

  test("fires neither CAPI when consent is only partial", async () => {
    mockCookies.mockResolvedValue(consentCookies("essential"))
    const result = await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    // Submission still succeeds; only tracking is withheld.
    expect(result.success).toBe(true)
    expect(mockTrackConversion).not.toHaveBeenCalled()
    expect(mockTrackLead).not.toHaveBeenCalled()
  })

  test("fires neither CAPI when the consent cookie is absent", async () => {
    mockCookies.mockResolvedValue(consentCookies(undefined))
    const result = await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(result.success).toBe(true)
    expect(mockTrackConversion).not.toHaveBeenCalled()
    expect(mockTrackLead).not.toHaveBeenCalled()
  })
})

describe("LinkedIn identifiers", () => {
  const linkedInInput = () => mockTrackConversion.mock.calls[0][0]

  // The extended identifiers live behind a feature flag; on for this suite.
  beforeEach(() => {
    vi.stubEnv("LINKEDIN_EXTENDED_CONVERSION_INPUT", "true")
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  function contactFd(): FormData {
    const fd = withCompany(base())
    fd.set("message", "Hello there")
    return fd
  }

  test("sends no IP or userInfo when the extended flag is off", async () => {
    vi.stubEnv("LINKEDIN_EXTENDED_CONVERSION_INPUT", "false")
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().ipAddress).toBeUndefined()
    expect(linkedInInput().userInfo).toBeUndefined()
    // The base identifiers are unaffected by the flag.
    expect(linkedInInput().email).toBe("john@example.com")
  })

  test("builds userInfo with company and title from a full form", async () => {
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().userInfo).toEqual({
      firstName: "John",
      lastName: "Doe",
      companyName: "Adfinis",
      title: "Engineer",
    })
  })

  test("omits company and title for a form that does not collect them", async () => {
    await saveSimpleForm("en", { success: false }, base())
    await flushAfter()
    expect(linkedInInput().userInfo).toEqual({
      firstName: "John",
      lastName: "Doe",
    })
  })

  test("passes an IPv4 do-connecting-ip as the LinkedIn ip", async () => {
    mockHeaders.mockResolvedValue(
      headersWith({ "do-connecting-ip": "198.51.100.9" }),
    )
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().ipAddress).toBe("198.51.100.9")
  })

  test("prefers cf-connecting-ip over do-connecting-ip", async () => {
    mockHeaders.mockResolvedValue(
      headersWith({
        "cf-connecting-ip": "203.0.113.4",
        "do-connecting-ip": "198.51.100.9",
      }),
    )
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().ipAddress).toBe("203.0.113.4")
  })

  test("drops an IPv6 client ip (LinkedIn only accepts IPv4)", async () => {
    mockHeaders.mockResolvedValue(
      headersWith({ "do-connecting-ip": "2001:db8::1" }),
    )
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().ipAddress).toBeUndefined()
  })

  test("never falls back to x-forwarded-for on DigitalOcean", async () => {
    mockHeaders.mockResolvedValue(
      headersWith({ "x-forwarded-for": "198.51.100.9, 10.0.0.1" }),
    )
    await saveContactForm("en", { success: false }, contactFd())
    await flushAfter()
    expect(linkedInInput().ipAddress).toBeUndefined()
  })

  test("excludeFromPayload also keeps the field out of the LinkedIn payload", async () => {
    const fd = withCompany(base())
    const result = await runFormAction(
      {
        type: "standard",
        fields: [
          "first_name",
          "last_name",
          "email",
          "company_name",
          "job_function",
          "privacy_policy",
        ],
        excludeFromPayload: ["company_name"],
      },
      "en",
      fd,
    )
    await flushAfter()
    expect(result.success).toBe(true)
    // company_name is excluded, so it must not reach the ad platform...
    expect(linkedInInput().userInfo?.companyName).toBeUndefined()
    // ...while non-excluded fields still flow through.
    expect(linkedInInput().userInfo?.title).toBe("Engineer")
    expect(linkedInInput().userInfo?.firstName).toBe("John")
  })
})
