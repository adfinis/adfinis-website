import { z } from "zod"
import formsparkSubmit from "@/lib/formspark-submit"
import { verifyAltcha } from "@/lib/altcha"
import { getDictionary, type Dictionary } from "@/lib/get-dictionary.server"
import { type Locale } from "@/lib/locale"
import { headers, cookies } from "next/headers"
import { after } from "next/server"
import { strapiFetch } from "@/lib/strapi"
import { redditCapi } from "@/lib/reddit-capi"
import { linkedinCapi, type LinkedInUserInfo } from "@/lib/linkedin-capi"
import { googleAdsCapi } from "@/lib/google-ads-capi"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { CLICK_ID_COOKIE, parseClickId } from "@/lib/click-id"

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
  try {
    const headersList = await headers()
    const data = {
      type: config.type,
      ...validated,
      privacy_policy: "yes",
      from_url: stripHostname(headersList.get("referer") || ""),
      is_created_at: new Date(),
    }
    await Promise.all([formSubmit({ data }), formsparkSubmit(data)])

    const conversionId = crypto.randomUUID()
    try {
      after(() => fireRedditLead(conversionId, validated, headersList))
    } catch {
      // Reddit tracking must never affect the submission result
    }
    try {
      after(async () => {
        try {
          await fireLinkedInConversion(conversionId, validated, headersList)
        } catch (error) {
          console.error("LinkedIn conversion failed", { conversionId, error })
        }
      })
    } catch {
      // Registering the callback must never affect the submission result
    }
    try {
      after(async () => {
        try {
          await fireGoogleAdsConversion(conversionId, validated)
        } catch (error) {
          console.error("Google Ads conversion failed", { conversionId, error })
        }
      })
    } catch {
      // Registering the callback must never affect the submission result
    }
    return { success: true, conversionId }
  } catch {
    return { success: false, values }
  }
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
  return strapiFetch("forms-betas", {
    cache: "no-cache",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

async function fireRedditLead(
  conversionId: string,
  data: Record<string, unknown>,
  headersList: Headers,
): Promise<void> {
  const cookieStore = await cookies()
  if (cookieStore.get(COOKIE_CONSENT_KEY)?.value !== "all") return

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

async function fireLinkedInConversion(
  conversionId: string,
  data: Record<string, unknown>,
  headersList: Headers,
): Promise<void> {
  const cookieStore = await cookies()
  if (cookieStore.get(COOKIE_CONSENT_KEY)?.value !== "all") return

  const email = typeof data.email === "string" ? data.email : undefined

  const extended = process.env.LINKEDIN_EXTENDED_CONVERSION_INPUT === "true"

  await linkedinCapi.trackConversion({
    eventId: conversionId,
    email,
    liFatId: cookieStore.get("li_fat_id")?.value,
    ipAddress: extended ? getLinkedInIp(headersList) : undefined,
    userInfo: extended ? buildUserInfo(data) : undefined,
  })
}

async function fireGoogleAdsConversion(
  conversionId: string,
  data: Record<string, unknown>,
) {
  const cookieStore = await cookies()
  if (cookieStore.get(COOKIE_CONSENT_KEY)?.value !== "all") return

  const clickId = parseClickId(cookieStore.get(CLICK_ID_COOKIE)?.value)

  await googleAdsCapi.trackConversion({
    transactionId: conversionId,
    clickId,
    email: typeof data.email === "string" ? data.email : undefined,
    phone:
      typeof data.phone_number === "string" ? data.phone_number : undefined,
  })
}

function getLinkedInIp(headersList: Headers): string | undefined {
  const ip =
    headersList.get("cf-connecting-ip")?.trim() ||
    headersList.get("do-connecting-ip")?.trim() ||
    undefined
  if (!ip) return undefined
  if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
    console.warn("LinkedIn CAPI: dropping non-IPv4 client IP")
    return undefined
  }
  return ip
}

function buildUserInfo(
  data: Record<string, unknown>,
): LinkedInUserInfo | undefined {
  const str = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : undefined

  const firstName = str(data.first_name)
  const lastName = str(data.last_name)
  if (!firstName || !lastName) return undefined

  const userInfo: LinkedInUserInfo = { firstName, lastName }
  const companyName = str(data.company_name)
  if (companyName) userInfo.companyName = companyName
  const title = str(data.job_function)
  if (title) userInfo.title = title
  return userInfo
}
