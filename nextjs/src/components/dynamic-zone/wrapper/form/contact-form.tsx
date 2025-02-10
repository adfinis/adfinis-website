"use client"

import { saveContactForm } from "@/app/actions"
import { useFormState } from "react-dom"
import { useEffect, useRef } from "react"
import FormColumns from "@/components/form/form-columns"
import InputField from "@/components/dynamic-zone/wrapper/form/input-field"
import EmailField from "@/components/dynamic-zone/wrapper/form/email-field"
import CheckboxField from "@/components/dynamic-zone/wrapper/form/checkbox-field"
import Button from "@/components/button"
import TextareaField from "@/components/dynamic-zone/wrapper/form/textarea-field"

type Props = {
  locale?: string
  submitLabel: string
}
export default function ContactForm({ submitLabel, locale }: Props) {
  const action = saveContactForm.bind(null, locale ?? "en")
  const [state, formAction] = useFormState(action, { success: false })
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current && state.success) {
      formRef.current.reset()
    }
  }, [state.success])

  return (
    <form action={formAction} ref={formRef}>
      <div className="grid gap-4 max-w-4xl mx-auto mt-8">
        <FormColumns>
          <InputField
            name={"firstName"}
            label={"First name"}
            errorMessage={state?.errors?.first_name ?? []}
          />
          <InputField
            name={"lastName"}
            label={"Last name"}
            errorMessage={state?.errors?.last_name ?? []}
          />
        </FormColumns>
        <EmailField
          label={"e-mail"}
          name={"email"}
          errorMessage={state?.errors?.email ?? []}
        />
        <InputField
          name={"company_name"}
          label={"Company Name"}
          errorMessage={state?.errors?.company_name ?? []}
        />
        <InputField
          name={"job_function"}
          label={"Job Function"}
          errorMessage={state?.errors?.job_function ?? []}
        />
        <TextareaField
          label={"Message"}
          name={"message"}
          errorMessage={state?.errors?.message ?? []}
        />
        <CheckboxField
          name="privacy_policy"
          label={"I accept the privacy policy of Adfinis"}
          errorMessage={state?.errors?.privacy_policy ?? []}
        />
        <div className="w-full text-center">
          {state.success && (
            <p className="text-input-primary">Form successfully submitted</p>
          )}
          <Button variant={"cta"} name={"submit"} type="submit">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
