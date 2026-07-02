"use server"

import { runFormAction, type FormState } from "@/lib/form-actions-shared"
import { type Locale } from "@/lib/locale"

export async function saveSimpleForm(
  locale: Locale,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  return runFormAction(
    {
      type: "short",
      fields: ["first_name", "last_name", "email", "privacy_policy"],
    },
    locale,
    formData,
  )
}

export async function saveStandardForm(
  locale: Locale,
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
    locale,
    formData,
  )
}

export async function saveContactForm(
  locale: Locale,
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
    locale,
    formData,
  )
}

export async function saveEventForm(
  locale: Locale,
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
    locale,
    formData,
  )
}

export async function saveRaffleForm(
  locale: Locale,
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
    locale,
    formData,
  )
}
