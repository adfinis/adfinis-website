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
    first_name: z.string().trim().min(1, messages[locale].required),
    last_name: z.string().trim().min(1, messages[locale].required),
    email: z.string().email(messages[locale].email),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
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
        type: "short",
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
        type: "short",
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
