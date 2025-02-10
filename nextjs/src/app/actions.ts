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

export async function saveSimpleForm(
  locale: string,
  state: SaveSimpleFormState,
  formData: FormData,
): Promise<SaveSimpleFormState> {
  const saveSimpleFormSchema = z.object({
    first_name: z.string().trim().min(1, messages[locale].required),
    last_name: z.string().trim().min(1, messages[locale].required),
    email: z.string().email(messages[locale].email),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        message: messages[locale].privacyPolicy,
      }),
    ),
  })

  const result = saveSimpleFormSchema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
  })

  if (result.success) {
    const response = await formSubmit({
      data: {
        type: "short",
        ...result.data,
        ...{ privacy_policy: "yes", is_created_at: new Date() },
      },
    })

    return {
      success: true,
    }
  }

  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
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
  const schema = z.object({
    first_name: z.string().trim().min(1, messages[locale].required),
    last_name: z.string().trim().min(1, messages[locale].required),
    email: z.string().email(messages[locale].email),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        message: messages[locale].privacyPolicy,
      }),
    ),
  })

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
