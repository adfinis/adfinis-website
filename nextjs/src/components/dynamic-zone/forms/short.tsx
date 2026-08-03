"use client"

import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Altcha from "@/components/form-fields/altcha"
import Button from "@/components/button"
import { saveSimpleForm } from "@/app/actions"
import { useRef, useActionState } from "react"
import Checkbox from "@/components/form-fields/checkbox"
import { useRestoreFormValues } from "@/components/form/use-restore-form-values"
import { useFormConfirmation } from "@/components/form/use-form-confirmation"
import FormConfirmation from "@/components/form/form-confirmation"
import { Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type Props = {
  submitLabel: string
  dictionary: Dictionary
  locale: Locale
}

export default function Short({ submitLabel, dictionary, locale }: Props) {
  const action = saveSimpleForm.bind(null, locale ?? "en")
  const [state, formAction] = useActionState(action, { success: false })
  const formRef = useRef<HTMLFormElement>(null)

  useRestoreFormValues(formRef, state)
  const { showConfirmation, submitAnother } = useFormConfirmation(
    state,
    formRef,
  )

  return (
    <form action={formAction} ref={formRef}>
      {showConfirmation ? (
        <FormConfirmation
          message={dictionary.forms.submitSuccessful}
          prompt={dictionary.forms.submitAnotherPrompt}
          link={dictionary.forms.submitAnotherLink}
          onSubmitAnother={submitAnother}
        />
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto mt-8">
          <FormColumns>
            <Input
              name={"firstName"}
              label={dictionary.forms.firstName}
              errorMessage={state?.errors?.first_name ?? []}
              defaultValue={state?.values?.firstName}
            />
            <Input
              name={"lastName"}
              label={dictionary.forms.lastName}
              errorMessage={state?.errors?.last_name ?? []}
              defaultValue={state?.values?.lastName}
            />
          </FormColumns>
          <Email
            label={dictionary.forms.email}
            name={"email"}
            errorMessage={state?.errors?.email ?? []}
            defaultValue={state?.values?.email}
          />
          <Checkbox
            name="privacy_policy"
            label={dictionary.forms.acceptPrivacyPolicy}
            errorMessage={state?.errors?.privacy_policy ?? []}
            defaultChecked={state?.values?.privacy_policy}
          />
          <Altcha errorMessage={state?.errors?.altcha ?? []} />
          <div className="w-full text-center">
            <Button variant={"cta"} name={"submit"} type="submit">
              {submitLabel}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
