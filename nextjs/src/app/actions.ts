"use server"

import { z } from "zod"
import messages from "@/components/form/messages"
import formSubmit from "@/lib/form-submit"

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

const shape = (locale: string) => {
  return {
    //@ts-ignore
    first_name: z.string().trim().min(1, messages[locale].required),
    //@ts-ignore
    last_name: z.string().trim().min(1, messages[locale].required),
    //@ts-ignore
    email: z.string().email(messages[locale].email),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        //@ts-ignore
        message: messages[locale].privacyPolicy,
      }),
    ),
  }
}

export async function saveSimpleForm(
  locale: string,
  state: SaveSimpleFormState,
  formData: FormData,
): Promise<SaveSimpleFormState> {
  const schema = z.object(shape(locale))
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
  locale: string,
  state: StandardFormState,
  formData: FormData,
): Promise<StandardFormState> {
  const schema = z.object(shape(locale))
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
  locale: string,
  state: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const schema = z.object({
    ...shape(locale),
    //@ts-ignore
    message: z.string().trim().min(1, messages[locale].required),
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
  locale: string,
  state: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const schema = z.object({
    ...shape(locale),
    // @ts-ignore
    message: z.string().trim().min(1, messages[locale].required),
    phone_number: z
      .string()
      .optional()
      .refine((val) => !val || /^\+?[0-9]+$/.test(val), {
        message: "Invalid phone number format.",
      })
      .refine((val) => !val || val.length >= 8, {
        message: "Phone number is too short.",
      })
      .refine((val) => !val || val.length <= 15, {
        message: "Phone number is too long.",
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
