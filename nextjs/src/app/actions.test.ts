import { beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))
vi.mock("@/lib/formspark-submit", () => ({ default: vi.fn() }))
vi.mock("@/lib/altcha", () => ({ verifyAltcha: vi.fn() }))
vi.mock("@/lib/strapi", () => ({ strapiFetch: vi.fn() }))
vi.mock("@sentry/nextjs", () => ({ logger: { error: vi.fn() } }))
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
vi.mock("next/server", () => ({ after: (fn: () => unknown) => fn() }))

import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { strapiFetch } from "@/lib/strapi"
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
  mockVerifyAltcha.mockResolvedValue(true)
  mockStrapiFetch.mockResolvedValue(new Response(null, { status: 200 }))
  mockFormsparkSubmit.mockResolvedValue(undefined as never)
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

  test("backend failure returns submitError with values, without errors", async () => {
    mockStrapiFetch.mockRejectedValue(new Error("strapi down"))
    const result = await saveSimpleForm("en", { success: false }, base())
    expect(result.success).toBe(false)
    expect(result.submitError).toBe(true)
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
