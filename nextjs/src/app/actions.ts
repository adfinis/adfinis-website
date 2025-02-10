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
