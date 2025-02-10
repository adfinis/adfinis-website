"use client"

import { useEffect, useRef } from "react"
import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Checkbox from "@/components/form-fields/checkbox"
import Button from "@/components/button"
import { saveStandardForm } from "@/app/actions"
import { useFormState } from "react-dom"

type Props = {
  locale?: string
  submitLabel: string
}
export default function Standard({ submitLabel, locale }: Props) {
  const action = saveStandardForm.bind(null, locale ?? "en")
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
          <Input
            name={"firstName"}
            label={"First name"}
            errorMessage={state?.errors?.first_name ?? []}
          />
          <Input
            name={"lastName"}
            label={"Last name"}
            errorMessage={state?.errors?.last_name ?? []}
          />
        </FormColumns>
        <Email
          label={"e-mail"}
          name={"email"}
          errorMessage={state?.errors?.email ?? []}
        />
        <Input
          name={"company_name"}
          label={"Company Name"}
          errorMessage={state?.errors?.company_name ?? []}
        />
        <Input
          name={"job_function"}
          label={"Job Function"}
          errorMessage={state?.errors?.job_function ?? []}
        />
        <Checkbox
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
