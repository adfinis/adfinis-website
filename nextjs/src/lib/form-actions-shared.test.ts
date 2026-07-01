import { beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("server-only", () => ({}))
vi.mock("@/lib/form-submit", () => ({ default: vi.fn() }))
vi.mock("@/lib/formspark-submit", () => ({ default: vi.fn() }))
vi.mock("@/lib/altcha", () => ({ verifyAltcha: vi.fn() }))

import formSubmit from "@/lib/form-submit"
import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { runFormAction, type FormConfig } from "./form-actions-shared"

const mockFormSubmit = vi.mocked(formSubmit)
const mockFormsparkSubmit = vi.mocked(formsparkSubmit)
const mockVerifyAltcha = vi.mocked(verifyAltcha)

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
    mockFormSubmit.mockResolvedValue(undefined as never)
    mockFormsparkSubmit.mockResolvedValue(undefined as never)
  })

  test("returns altcha error and skips submission when altcha fails", async () => {
    mockVerifyAltcha.mockResolvedValue(false)
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.errors?.altcha).toEqual(["This field is required."])
    expect(mockFormSubmit).not.toHaveBeenCalled()
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
    expect(mockFormSubmit).not.toHaveBeenCalled()
  })

  test("submits to both backends with trimmed, forced payload on success", async () => {
    const fd = validStandardFormData()
    fd.set("company_name", "  Adfinis  ")
    const result = await runFormAction(STANDARD, "en", fd)
    expect(result).toEqual({ success: true })
    expect(mockFormSubmit).toHaveBeenCalledTimes(1)
    expect(mockFormsparkSubmit).toHaveBeenCalledTimes(1)
    const payload = mockFormsparkSubmit.mock.calls[0][0] as Record<
      string,
      unknown
    >
    expect(payload.type).toBe("standard")
    expect(payload.privacy_policy).toBe("yes")
    expect(payload.company_name).toBe("Adfinis") // trimmed
    expect(payload.is_created_at).toBeInstanceOf(Date)
    expect(mockFormSubmit).toHaveBeenCalledWith({ data: payload })
  })

  test("returns values without errors when a backend throws", async () => {
    mockFormsparkSubmit.mockRejectedValue(new Error("network"))
    const result = await runFormAction(STANDARD, "en", validStandardFormData())
    expect(result.success).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.values?.firstName).toBe("John")
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
