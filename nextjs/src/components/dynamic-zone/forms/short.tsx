"use client"

import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Button from "@/components/button"
import { useFormState } from "react-dom"
import { saveSimpleForm } from "@/app/actions"
import { useEffect, useRef } from "react"
import Checkbox from "@/components/form-fields/checkbox"
import { Dictionary } from "@/hooks/useDictionary"

type Props = {
  submitLabel: string
  dictionary: Dictionary
}

export default function Short({ submitLabel, dictionary }: Props) {
  const action = saveSimpleForm.bind(null, dictionary)
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
        <Email
          label={dictionary.forms.email}
          name={"email"}
          errorMessage={state?.errors?.email ?? []}
        />
        <Checkbox
          name="privacy_policy"
          label={dictionary.forms.acceptPrivacyPolicy}
          errorMessage={state?.errors?.privacy_policy ?? []}
        />
        <div className="w-full text-center">
          {state.success && (
            <p className="text-input-primary">
              {dictionary.forms.submitSuccessful}
            </p>
          )}
          <Button variant={"cta"} name={"submit"} type="submit">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
