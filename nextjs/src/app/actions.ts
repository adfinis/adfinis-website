"use server"

import { runFormAction, type FormState } from "@/lib/form-actions-shared"
import { locales, type Locale } from "@/lib/locale"

function localeFromFormData(formData: FormData): Locale {
  const value = formData.get("locale")
  return typeof value === "string" &&
    (locales as readonly string[]).includes(value)
    ? (value as Locale)
    : "en"
}

export async function saveSimpleForm(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "short",
      fields: ["first_name", "last_name", "email", "privacy_policy"],
    },
    localeFromFormData(formData),
    formData,
  )
}

export async function saveStandardForm(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
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
    },
    localeFromFormData(formData),
    formData,
  )
}

export async function saveGatedContentForm(
  locale: Locale,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "gated-content",
      fields: [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "job_function",
        "privacy_policy",
      ],
    },
    locale,
    formData,
  )
}

export async function saveContactForm(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "contact",
      fields: [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "job_function",
        "message",
        "privacy_policy",
      ],
    },
    localeFromFormData(formData),
    formData,
  )
}

export async function saveEventForm(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "event",
      fields: [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "job_function",
        "message",
        "phone_number",
        "privacy_policy",
      ],
    },
    localeFromFormData(formData),
    formData,
  )
}

export async function saveRaffleForm(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "raffle",
      fields: [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "job_function",
        "privacy_policy",
        "agree_to_receive_mail",
      ],
      excludeFromPayload: ["agree_to_receive_mail"],
    },
    localeFromFormData(formData),
    formData,
  )
}
