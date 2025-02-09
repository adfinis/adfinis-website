"use server"

import { z } from "zod"
import messages from "@/components/form/messages"

type SaveSimpleFormStateErrors = {
  firstName?: string[]
  lastName?: string[]
  email?: string[]
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
  console.log(locale, state, formData)

  const saveSimpleFormSchema = z.object({
    firstName: z.string().trim().min(1, messages[locale].required),
    // lastName: z.string().trim().min(1, messages[locale].required),
    lastName: z.string().trim().min(1, "Dingeng"),
    email: z.string().email(messages[locale].email),
  })

  const result = saveSimpleFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  })

  if (result.success) {
    return {
      success: true,
    }
  }

  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
  }
}
