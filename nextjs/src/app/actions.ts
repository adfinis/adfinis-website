"use server"

import { z } from "zod"
import formSubmit from "@/lib/form-submit"
import formsparkSubmit from "@/lib/formspark-submit"
import { type Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"
import { getDictionary } from "@/lib/get-dictionary.server"

type SaveSimpleFormStateErrors = {
  first_name?: string[]
  last_name?: string[]
  email?: string[]
  privacy_policy?: string[]
}

type SimpleFormValues = {
  firstName?: string
  lastName?: string
  email?: string
  privacy_policy?: boolean
}

type SaveSimpleFormState = {
  success: boolean
  errors?: SaveSimpleFormStateErrors
  values?: SimpleFormValues
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

const raffleFormValidation = (dictionary: Dictionary) => {
  return {
    ...shape(dictionary),
    agree_to_receive_mail: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        message: dictionary.validation.agreeToReceiveMail,
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
  const schema = z.object({
    first_name: z.string().trim().min(1, dictionary.validation.required),
    last_name: z.string().trim().min(1, dictionary.validation.required),
    email: z.string().email(dictionary.validation.email),
    privacy_policy: z.preprocess(
      (val) => val === "on",
      z.boolean().refine((val) => val, {
        message: dictionary.validation.privacyPolicy,
      }),
    ),
  })
  const submittedValues: SimpleFormValues = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    privacy_policy: formData.get("privacy_policy") != null,
  }
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
  })

  if (validation.success) {
    const data = {
      type: "short",
      ...validation.data,
      ...{ privacy_policy: "yes", is_created_at: new Date() },
    }
    const formSubmitPromise = formSubmit({ data })
    const formsparkSubmitPromise = formsparkSubmit(data)

    try {
      await Promise.all([formSubmitPromise, formsparkSubmitPromise])
    } catch (e) {
      return {
        success: false,
        values: submittedValues,
      }
    }

    return {
      success: true,
    }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    values: submittedValues,
  }
}

type StandardFormStateErrors = {
  company_name?: string[]
  job_function?: string[]
} & SaveSimpleFormStateErrors

type RaffleFormStateErrors = {
  agree_to_receive_mail?: string[]
} & StandardFormStateErrors

type RaffleFormValues = {
  firstName?: string
  lastName?: string
  email?: string
  company_name?: string
  job_function?: string
  privacy_policy?: boolean
  agree_to_receive_mail?: boolean
}

type RaffleFormState = {
  success: boolean
  errors?: RaffleFormStateErrors
  values?: RaffleFormValues
}
export async function saveRaffleForm(
  locale: Locale,
  state: RaffleFormState,
  formData: FormData,
): Promise<RaffleFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object(raffleFormValidation(dictionary))
  const submittedValues: RaffleFormValues = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    company_name: (formData.get("company_name") as string) ?? "",
    job_function: (formData.get("job_function") as string) ?? "",
    privacy_policy: formData.get("privacy_policy") != null,
    agree_to_receive_mail: formData.get("agree_to_receive_mail") != null,
  }
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    agree_to_receive_mail: formData.get("agree_to_receive_mail"),
    company_name: formData.get("company_name"),
    job_function: formData.get("job_function"),
  })

  if (validation.success) {
    const payload = {
      type: "raffle",
      ...validation.data,
      ...{ privacy_policy: "yes", is_created_at: new Date() },
      company_name: formData.get("company_name"),
      job_function: formData.get("job_function"),
    }
    const { agree_to_receive_mail, ...data } = payload
    const formSubmitPromise = formSubmit({ data })
    const formsparkSubmitPromise = formsparkSubmit(data)

    try {
      await Promise.all([formSubmitPromise, formsparkSubmitPromise])
    } catch (e) {
      return {
        success: false,
        values: submittedValues,
      }
    }

    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    values: submittedValues,
  }
}

type StandardFormValues = SimpleFormValues & {
  company_name?: string
  job_function?: string
}

type StandardFormState = {
  success: boolean
  errors?: StandardFormStateErrors
  values?: StandardFormValues
}
export async function saveStandardForm(
  locale: Locale,
  state: StandardFormState,
  formData: FormData,
): Promise<StandardFormState> {
  const dictionary = await getDictionary(locale)
  const schema = z.object(shape(dictionary))
  const submittedValues: StandardFormValues = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    company_name: (formData.get("company_name") as string) ?? "",
    job_function: (formData.get("job_function") as string) ?? "",
    privacy_policy: formData.get("privacy_policy") != null,
  }
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    company_name: formData.get("company_name"),
    job_function: formData.get("job_function"),
    from_url: formData.get("from_url"),
  })

  if (validation.success) {
    const data = {
      type: "standard",
      ...validation.data,
      ...{ privacy_policy: "yes", is_created_at: new Date() },
      company_name: formData.get("company_name"),
      job_function: formData.get("job_function"),
    }
    const formSubmitPromise = formSubmit({ data })
    const formsparkSubmitPromise = formsparkSubmit(data)

    try {
      await Promise.all([formSubmitPromise, formsparkSubmitPromise])
    } catch (e) {
      return {
        success: false,
        values: submittedValues,
      }
    }

    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    values: submittedValues,
  }
}

type ContactFormStateErrors = {
  message?: string[]
} & StandardFormStateErrors

type ContactFormValues = StandardFormValues & {
  message?: string
}

type ContactFormState = {
  success: boolean
  errors?: ContactFormStateErrors
  values?: ContactFormValues
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
  const submittedValues: ContactFormValues = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    company_name: (formData.get("company_name") as string) ?? "",
    job_function: (formData.get("job_function") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
    privacy_policy: formData.get("privacy_policy") != null,
  }
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    company_name: formData.get("company_name"),
    job_function: formData.get("job_function"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    message: formData.get("message"),
  })

  if (validation.success) {
    const data = {
      type: "contact",
      ...validation.data,
      ...{ privacy_policy: "yes", is_created_at: new Date() },
      company_name: formData.get("company_name"),
      job_function: formData.get("job_function"),
    }
    const formSubmitPromise = formSubmit({ data })
    const formsparkSubmitPromise = formsparkSubmit(data)

    try {
      await Promise.all([formSubmitPromise, formsparkSubmitPromise])
    } catch (e) {
      return {
        success: false,
        values: submittedValues,
      }
    }

    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    values: submittedValues,
  }
}

type EventFormStateErrors = {
  phone_number?: string[]
} & ContactFormStateErrors

type EventFormValues = ContactFormValues & {
  phone_number?: string
}

type EventFormState = {
  success: boolean
  errors?: EventFormStateErrors
  values?: EventFormValues
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
  const submittedValues: EventFormValues = {
    firstName: (formData.get("firstName") as string) ?? "",
    lastName: (formData.get("lastName") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    company_name: (formData.get("company_name") as string) ?? "",
    job_function: (formData.get("job_function") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
    phone_number: (formData.get("phone_number") as string) ?? "",
    privacy_policy: formData.get("privacy_policy") != null,
  }
  const validation = schema.safeParse({
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    privacy_policy: formData.get("privacy_policy"),
    message: formData.get("message"),
    phone_number: formData.get("phone_number"),
    company_name: formData.get("company_name"),
    job_function: formData.get("job_function"),
  })

  if (validation.success) {
    const data = {
      type: "event",
      ...validation.data,
      ...{ privacy_policy: "yes", is_created_at: new Date() },
      company_name: formData.get("company_name"),
      job_function: formData.get("job_function"),
    }
    const formSubmitPromise = formSubmit({ data })
    const formsparkSubmitPromise = formsparkSubmit(data)

    try {
      await Promise.all([formSubmitPromise, formsparkSubmitPromise])
    } catch (e) {
      return {
        success: false,
        values: submittedValues,
      }
    }

    return { success: true }
  }

  return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    values: submittedValues,
  }
}
