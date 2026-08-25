import { beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))
vi.mock("@sentry/nextjs", () => ({ logger: { error: vi.fn() } }))
vi.mock("@/lib/formspark-submit", () => ({ default: vi.fn() }))
vi.mock("@/lib/altcha", () => ({ verifyAltcha: vi.fn() }))
vi.mock("@/lib/strapi", () => ({ strapiFetch: vi.fn() }))
vi.mock("next/headers", () => ({
  headers: vi.fn(
    async () => new Headers({ referer: "https://localhost:3000/en/contact" }),
  ),
}))

import * as Sentry from "@sentry/nextjs"
import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { strapiFetch } from "@/lib/strapi"
import { runFormAction, type FormConfig } from "./form-actions-shared"

const mockStrapiFetch = vi.mocked(strapiFetch)
const mockFormsparkSubmit = vi.mocked(formsparkSubmit)
const mockVerifyAltcha = vi.mocked(verifyAltcha)
const mockSentryLogError = vi.mocked(Sentry.logger.error)

const STANDARD: FormConfig = {
  type: "standard",
  fields: [
    "first_name",
    "last_name",
    "email",
    "company_name",
    "job_function",
    "privacy_policy",
  ],
}

function validStandardFormData(): FormData {
  const fd = new FormData()
  fd.set("firstName", "John")
  fd.set("lastName", "Doe")
  fd.set("email", "john@example.com")
  fd.set("company_name", "Adfinis")
  fd.set("job_function", "Engineer")
  fd.set("privacy_policy", "on")
  fd.set("altcha", "solved-payload")
  return fd
}

describe("runFormAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockVerifyAltcha.mockResolvedValue(true)
    mockStrapiFetch.mockResolvedValue(new Response(null, { status: 200 }))
    mockFormsparkSubmit.mockResolvedValue(undefined as never)
  })

  test("returns altcha error and skips submission when altcha fails", async () => {
    mockVerifyAltcha.mockResolvedValue(false)
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.errors?.altcha).toEqual(["This field is required."])
    expect(mockStrapiFetch).not.toHaveBeenCalled()
    expect(mockFormsparkSubmit).not.toHaveBeenCalled()
  })

  test("returns snake_case validation errors with camel/snake values on invalid input", async () => {
    const fd = new FormData()
    fd.set("firstName", "")
    fd.set("lastName", "Doe")
    fd.set("email", "not-an-email")
    fd.set("company_name", "Adfinis")
    fd.set("job_function", "Engineer")
    fd.set("altcha", "solved-payload")
    const result = await runFormAction(STANDARD, "en", fd)
    expect(result.success).toBe(false)
    expect(result.errors?.first_name).toBeDefined()
    expect(result.errors?.email).toBeDefined()
    // dual-casing: values key matches the input name=
    expect(result.values?.firstName).toBe("")
    expect(result.values?.lastName).toBe("Doe")
    expect(result.values?.company_name).toBe("Adfinis")
    expect(result.values?.privacy_policy).toBe(false)
    expect(mockStrapiFetch).not.toHaveBeenCalled()
  })

  test("submits to both backends with trimmed, forced payload including from_url on success", async () => {
    const fd = validStandardFormData()
    fd.set("company_name", "  Adfinis  ")
    const result = await runFormAction(STANDARD, "en", fd)
    expect(result.success).toBe(true)
    expect(result.conversionId).toEqual(expect.any(String))
    expect(mockStrapiFetch).toHaveBeenCalledTimes(1)
    expect(mockFormsparkSubmit).toHaveBeenCalledTimes(1)

    // formspark receives the data object directly
    const payload = mockFormsparkSubmit.mock.calls[0][0] as Record<
      string,
      unknown
    >
    expect(payload.type).toBe("standard")
    expect(payload.privacy_policy).toBe("yes")
    expect(payload.company_name).toBe("Adfinis") // trimmed
    expect(payload.from_url).toBe("/en/contact") // hostname stripped from referer
    expect(payload.is_created_at).toBeInstanceOf(Date)

    // strapi receives { data } POSTed to the forms-betas endpoint
    const [path, init] = mockStrapiFetch.mock.calls[0]
    expect(path).toBe("forms-betas")
    expect(init?.method).toBe("POST")
    expect(JSON.parse(init?.body as string).data.from_url).toBe("/en/contact")
  })

  test("returns submitError with values and logs to Sentry when formspark throws", async () => {
    mockFormsparkSubmit.mockRejectedValue(
      new Error("formspark responded with 500", {
        cause: { status: 500, body: "Internal Server Error" },
      }),
    )
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.submitError).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.values?.firstName).toBe("John")
    expect(mockSentryLogError).toHaveBeenCalledTimes(1)
    expect(mockSentryLogError).toHaveBeenCalledWith("Form submission failed", {
      destination: "formspark",
      form_type: "standard",
      status: 500,
      response_body: "Internal Server Error",
    })
  })

  test("returns submitError and logs to Sentry when strapi throws a network error", async () => {
    mockStrapiFetch.mockRejectedValue(new Error("strapi down"))
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.submitError).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.values?.firstName).toBe("John")
    const attrs = mockSentryLogError.mock.calls[0][1] as Record<string, unknown>
    expect(attrs.destination).toBe("strapi")
    expect(attrs.status).toBeNull()
  })

  test("returns submitError when strapi responds with a non-ok status", async () => {
    mockStrapiFetch.mockResolvedValue(new Response("boom", { status: 500 }))
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.submitError).toBe(true)
    expect(result.values?.firstName).toBe("John")
  })

  test("logs both destinations to Sentry when both fail", async () => {
    mockStrapiFetch.mockRejectedValue(
      new Error("strapi responded with 500", {
        cause: { status: 500, body: "Internal Server Error" },
      }),
    )
    mockFormsparkSubmit.mockRejectedValue(
      new Error("formspark responded with 500", {
        cause: { status: 500, body: "Internal Server Error" },
      }),
    )
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.submitError).toBe(true)
    expect(mockSentryLogError).toHaveBeenCalledTimes(2)
    const destinationsLogged = mockSentryLogError.mock.calls.map(
      (c) => (c[1] as Record<string, unknown>).destination,
    )
    expect(destinationsLogged).toEqual(["strapi", "formspark"])
  })

  test("never puts user field values into Sentry attributes", async () => {
    mockFormsparkSubmit.mockRejectedValue(
      new Error("formspark responded with 500", {
        cause: { status: 500, body: "Internal Server Error" },
      }),
    )
    await runFormAction(STANDARD, "en", validStandardFormData())
    const attrs = mockSentryLogError.mock.calls[0][1] as Record<string, unknown>
    const serialized = JSON.stringify(attrs)
    expect(serialized).not.toContain("John")
    expect(serialized).not.toContain("john@example.com")
    expect(serialized).not.toContain("Adfinis")
  })

  test("does not log to Sentry on success, validation failure or altcha failure", async () => {
    await runFormAction(STANDARD, "en", validStandardFormData())
    const invalid = validStandardFormData()
    invalid.set("email", "not-an-email")
    await runFormAction(STANDARD, "en", invalid)
    mockVerifyAltcha.mockResolvedValue(false)
    await runFormAction(STANDARD, "en", validStandardFormData())
    expect(mockSentryLogError).not.toHaveBeenCalled()
  })

  test("excludeFromPayload omits the field from the payload but still validates it", async () => {
    const raffle: FormConfig = {
      type: "raffle",
      fields: [...STANDARD.fields, "agree_to_receive_mail"],
      excludeFromPayload: ["agree_to_receive_mail"],
    }
    const fd = validStandardFormData()
    // missing agree_to_receive_mail -> should fail validation
    const failing = await runFormAction(raffle, "en", fd)
    expect(failing.success).toBe(false)
    expect(failing.errors?.agree_to_receive_mail).toBeDefined()
    // checked -> passes, but excluded from payload
    fd.set("agree_to_receive_mail", "on")
    const ok = await runFormAction(raffle, "en", fd)
    expect(ok.success).toBe(true)
    const payload = mockFormsparkSubmit.mock.calls.at(-1)?.[0] as Record<
      string,
      unknown
    >
    expect(payload.type).toBe("raffle")
    expect("agree_to_receive_mail" in payload).toBe(false)
  })
})
