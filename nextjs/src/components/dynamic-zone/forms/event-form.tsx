"use client"

import { saveEventForm } from "@/app/actions"
import { useFormState } from "react-dom"
import { useEffect, useRef } from "react"
import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Checkbox from "@/components/form-fields/checkbox"
import Button from "@/components/button"
import Textarea from "@/components/form-fields/textarea"
import { Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type Props = {
  locale: Locale
  submitLabel: string
  dictionary: Dictionary
}
export default function EventForm({ submitLabel, dictionary, locale }: Props) {
  const action = saveEventForm.bind(null, locale ?? "en")
  const [state, formAction] = useFormState(action, { success: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formRef.current && state.success) {
      formRef.current.reset()
    }
  }, [state.success])

  return (
    <form action={formAction} ref={formRef}>
      <div className="grid gap-4 max-w-4xl mx-auto mt-8">
        <FormColumns>
          <Input
            name={"firstName"}
            label={dictionary.forms.firstName}
            errorMessage={state?.errors?.first_name ?? []}
          />
          <Input
            name={"lastName"}
            label={dictionary.forms.lastName}
            errorMessage={state?.errors?.last_name ?? []}
          />
        </FormColumns>
        <FormColumns>
          <Email
            label={dictionary.forms.email}
            name={"email"}
            errorMessage={state?.errors?.email ?? []}
          />
          <Input
            label={dictionary.forms.phone}
            name={"phone_number"}
            errorMessage={state?.errors?.phone_number ?? []}
          />
        </FormColumns>
        <FormColumns>
          <Input
            name={"company_name"}
            label={dictionary.forms.companyName}
            errorMessage={state?.errors?.company_name ?? []}
          />
          <Input
            name={"job_function"}
            label={dictionary.forms.jobFunction}
            errorMessage={state?.errors?.job_function ?? []}
          />
        </FormColumns>
        <Textarea
          label={dictionary.forms.message}
          name={"message"}
          errorMessage={state?.errors?.message ?? []}
        />
        <Checkbox
          name="privacy_policy"
          label={dictionary.forms.acceptPrivacyPolicy}
          errorMessage={state?.errors?.privacy_policy ?? []}
        />
        <div className="w-full text-center">
          {state.success ? (
            <p className="text-input-primary">
              {dictionary.forms.submitSuccessful}
            </p>
          ) : (
            <Button variant={"cta"} name={"submit"} type="submit">
              {submitLabel}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
