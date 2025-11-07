"use server"

import { z } from "zod"
import formSubmit from "@/lib/form-submit"
import { type Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"
import { getDictionary } from "@/lib/get-dictionary.server"

type SaveSimpleFormStateErrors = {
  first_name?: string[]
  last_name?: string[]
  email?: string[]
  privacy_policy?: string[]
}

type SaveSimpleFormState = {
  success: boolean
  errors?: SaveSimpleFormStateErrors
}

const shape = (dictionary: Dictionary) => {
  return {
    first_name: z.string().trim().min(1, dictionary.validation.required),
    last_name: z.string().trim().min(1, dictionary.validation.required),
    email: z.string().email(dictionary.validation.email),
    company_name: z.string().trim().min(1, dictionary.validation.required),
    job_function: z.string().trim().min(1, dictionary.validation.required),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        message: dictionary.validation.privacyPolicy,
      }),
    ),
  }
}

export async function saveSimpleForm(
  locale: Locale,
  state: SaveSimpleFormState,
  formData: FormData,
): Promise<SaveSimpleFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object(shape(dictionary))
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
  })

  if (validation.success) {
    await formSubmit({
      data: {
        type: "short",
        ...validation.data,
        ...{ privacy_policy: "yes", is_created_at: new Date() },
      },
    })

    return {
      success: true,
    }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
  }
}

type StandardFormStateErrors = {
  company_name?: string[]
  job_function?: string[]
} & SaveSimpleFormStateErrors

type StandardFormState = {
  success: boolean
  errors?: StandardFormStateErrors
}
export async function saveStandardForm(
  locale: Locale,
  state: StandardFormState,
  formData: FormData,
): Promise<StandardFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object(shape(dictionary))
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
  })

  if (validation.success) {
    await formSubmit({
      data: {
        type: "standard",
        ...validation.data,
        ...{ privacy_policy: "yes", is_created_at: new Date() },
        company_name: formData.get("company_name"),
        job_function: formData.get("job_function"),
      },
    })
    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
  }
}

type ContactFormStateErrors = {
  message?: string[]
} & StandardFormStateErrors

type ContactFormState = {
  success: boolean
  errors?: ContactFormStateErrors
}
export async function saveContactForm(
  locale: Locale,
  state: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object({
    ...shape(dictionary),
    //@ts-ignore
    message: z.string().trim().min(1, dictionary.validation.required),
  })
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    message: formData.get("message"),
  })

  if (validation.success) {
    await formSubmit({
      data: {
        type: "contact",
        ...validation.data,
        ...{ privacy_policy: "yes", is_created_at: new Date() },
        company_name: formData.get("company_name"),
        job_function: formData.get("job_function"),
      },
    })
    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
  }
}

type EventFormStateErrors = {
  phone_number?: string[]
} & ContactFormStateErrors

type EventFormState = {
  success: boolean
  errors?: EventFormStateErrors
}
export async function saveEventForm(
  locale: Locale,
  state: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object({
    ...shape(dictionary),
    // @ts-ignore
    message: z.string().trim().min(1, dictionary.validation.required),
    phone_number: z
      .string()
      .optional()
      .refine((val) => !val || /^\+?[0-9]+$/.test(val), {
        message: dictionary.validation.phone.format,
      })
      .refine((val) => !val || val.length >= 8, {
        message: dictionary.validation.phone.short,
      })
      .refine((val) => !val || val.length <= 15, {
        message: dictionary.validation.phone.long,
      }),
  })
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    message: formData.get("message"),
    phone_number: formData.get("phone_number"),
  })

  if (validation.success) {
    await formSubmit({
      data: {
        type: "event",
        ...validation.data,
        ...{ privacy_policy: "yes", is_created_at: new Date() },
        company_name: formData.get("company_name"),
        job_function: formData.get("job_function"),
      },
    })
    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
  }
}
