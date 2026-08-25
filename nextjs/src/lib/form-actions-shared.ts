import { z } from "zod"
import * as Sentry from "@sentry/nextjs"
import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { getDictionary, type Dictionary } from "@/lib/get-dictionary.server"
import { type Locale } from "@/lib/locale"
import { headers, cookies } from "next/headers"
import { after } from "next/server"
import { strapiFetch } from "@/lib/strapi"
import { redditCapi } from "@/lib/reddit-capi"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"

const fieldBuilders = {
  first_name: (d: Dictionary) =>
    z.string().trim().min(1, d.validation.required),
  last_name: (d: Dictionary) => z.string().trim().min(1, d.validation.required),
  email: (d: Dictionary) => z.string().email(d.validation.email),
  company_name: (d: Dictionary) =>
    z.string().trim().min(1, d.validation.required),
  job_function: (d: Dictionary) =>
    z.string().trim().min(1, d.validation.required),
  message: (d: Dictionary) => z.string().trim().min(1, d.validation.required),
  phone_number: (d: Dictionary) =>
    z
      .string()
      .optional()
      .refine((v) => !v || /^\+?[0-9]+$/.test(v), {
        message: d.validation.phone.format,
      })
      .refine((v) => !v || v.length >= 8, { message: d.validation.phone.short })
      .refine((v) => !v || v.length <= 15, {
        message: d.validation.phone.long,
      }),
  privacy_policy: (d: Dictionary) =>
    z.preprocess(
      (v) => v === "on",
      z.boolean().refine((v) => v, { message: d.validation.privacyPolicy }),
    ),
  agree_to_receive_mail: (d: Dictionary) =>
    z.preprocess(
      (v) => v === "on",
      z
        .boolean()
        .refine((v) => v, { message: d.validation.agreeToReceiveMail }),
    ),
} as const

export type FieldKey = keyof typeof fieldBuilders

const FIELD_META: Record<FieldKey, { formName: string; checkbox?: true }> = {
  first_name: { formName: "firstName" },
  last_name: { formName: "lastName" },
  email: { formName: "email" },
  company_name: { formName: "company_name" },
  job_function: { formName: "job_function" },
  message: { formName: "message" },
  phone_number: { formName: "phone_number" },
  privacy_policy: { formName: "privacy_policy", checkbox: true },
  agree_to_receive_mail: { formName: "agree_to_receive_mail", checkbox: true },
}

// Keyed by input `name=` attribute (so consumers can restore field values and
// useRestoreFormValues can match form.elements). Text fields are strings;
// checkbox fields are booleans. camelCase for first/last name, snake_case rest.
export type FormValues = {
  firstName?: string
  lastName?: string
  email?: string
  company_name?: string
  job_function?: string
  message?: string
  phone_number?: string
  privacy_policy?: boolean
  agree_to_receive_mail?: boolean
}

export type FormState = {
  success: boolean
  submitError?: boolean
  errors?: Partial<Record<FieldKey | "altcha", string[]>>
  values?: FormValues
  conversionId?: string
}

export interface FormConfig {
  type: string
  fields: readonly FieldKey[]
  excludeFromPayload?: readonly FieldKey[]
}

export async function runFormAction(
  config: FormConfig,
  locale: Locale,
  formData: FormData,
): Promise<FormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object(
    Object.fromEntries(
      config.fields.map((k) => [k, fieldBuilders[k](dictionary)]),
    ),
  )

  const valuesRecord: Record<string, string | boolean> = {}
  for (const k of config.fields) {
    const { formName, checkbox } = FIELD_META[k]
    valuesRecord[formName] = checkbox
      ? formData.get(formName) != null
      : (formData.get(formName) as string) ?? ""
  }
  // Keys are driven by config.fields but always match FormValues' known keys.
  const values = valuesRecord as FormValues

  const altchaOk = await verifyAltcha(formData.get("altcha"))
  if (!altchaOk) {
    return {
      success: false,
      errors: { altcha: [dictionary.validation.required] },
      values,
    }
  }

  const input = Object.fromEntries(
    config.fields.map((k) => [k, formData.get(FIELD_META[k].formName)]),
  )
  const validation = schema.safeParse(input)
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      values,
    }
  }

  const exclude = new Set<FieldKey>(config.excludeFromPayload ?? [])
  const validated = Object.fromEntries(
    Object.entries(validation.data).filter(
      ([k]) => !exclude.has(k as FieldKey),
    ),
  )
  const headersList = await headers()
  const data = {
    type: config.type,
    ...validated,
    privacy_policy: "yes",
    from_url: stripHostname(headersList.get("referer") || ""),
    is_created_at: new Date(),
  }
  const results = await Promise.allSettled([
    formSubmit({ data }),
    formsparkSubmit(data),
  ])

  const destinations = ["strapi", "formspark"] as const
  let failed = false
  results.forEach((result, i) => {
    if (result.status !== "rejected") return
    failed = true
    const error = result.reason
    const cause = (error?.cause ?? {}) as { status?: number; body?: string }
    console.error(
      `Form submission failed (type=${config.type}, destination=${destinations[i]}):`,
      error,
    )
    // Metadata only — no form field values may ever reach Sentry.
    Sentry.logger.error("Form submission failed", {
      destination: destinations[i],
      form_type: config.type,
      status: cause.status ?? null,
      response_body: (cause.body ?? String(error)).slice(0, 1000),
    })
  })

  if (failed) {
    return { success: false, submitError: true, values }
  }

  const conversionId = crypto.randomUUID()
  try {
    after(() => fireRedditLead(conversionId, validation.data, headersList))
  } catch {
    // Reddit tracking must never affect the submission result
  }
  return { success: true, conversionId }
}

function stripHostname(referrer: string): string {
  try {
    const url = new URL(referrer)
    return url.pathname + url.search + url.hash
  } catch {
    return referrer
  }
}

async function formSubmit(payload: any) {
  const res = await strapiFetch("forms-betas", {
    cache: "no-cache",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable body>")
    console.error(
      `Strapi form submission failed (type=${payload.data?.type}): ${res.status} ${res.statusText} — ${body}`,
    )
    throw new Error(`strapi responded with ${res.status}`, {
      cause: { status: res.status, body },
    })
  }
  return res
}

async function fireRedditLead(
  conversionId: string,
  data: Record<string, unknown>,
  headersList: Headers,
): Promise<void> {
  const cookieStore = await cookies()
  const requireConsent = process.env.REDDIT_CAPI_REQUIRE_CONSENT === "true"
  if (requireConsent) {
    const consent = cookieStore.get(COOKIE_CONSENT_KEY)?.value
    if (consent !== "all") return
  }

  const ipAddress =
    headersList.get("do-connecting-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    undefined

  const email = typeof data.email === "string" ? data.email : undefined
  const phone =
    typeof data.phone_number === "string" ? data.phone_number : undefined

  await redditCapi.trackLead({
    conversionId,
    email,
    phone,
    ipAddress,
    userAgent: headersList.get("user-agent") || undefined,
    rdtUuid: cookieStore.get("_rdt_uuid")?.value,
  })
}
