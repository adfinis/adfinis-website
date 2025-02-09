"use client"

import FormColumns from "@/components/form/form-columns"
import InputField from "@/components/dynamic-zone/wrapper/form/input-field"
import EmailField from "@/components/dynamic-zone/wrapper/form/email-field"
import Button from "@/components/button"
import { useFormState } from "react-dom"
import { saveSimpleForm } from "@/app/actions"
import { useEffect, useRef } from "react"

type Props = {
  locale?: string
  submitLabel: string
}

export default function ShortForm({ submitLabel, locale }: Props) {
  const action = saveSimpleForm.bind(null, locale ?? "en")
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
            errorMessage={state?.errors?.firstName ?? []}
          />
          <InputField
            name={"lastName"}
            label={"Last name"}
            errorMessage={state?.errors?.lastName ?? []}
          />
        </FormColumns>
        <EmailField
          label={"e-mail"}
          name={"email"}
          errorMessage={state?.errors?.email ?? []}
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
