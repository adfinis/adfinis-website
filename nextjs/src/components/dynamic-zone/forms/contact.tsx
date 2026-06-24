"use client"

import { saveContactForm } from "@/app/actions"
import { useRef, useActionState } from "react"
import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Checkbox from "@/components/form-fields/checkbox"
import Altcha from "@/components/form-fields/altcha"
import Button from "@/components/button"
import Textarea from "@/components/form-fields/textarea"
import { useRestoreFormValues } from "@/components/form/use-restore-form-values"
import { Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type Props = {
  locale: Locale
  submitLabel: string
  dictionary: Dictionary
}
export default function Contact({ submitLabel, dictionary, locale }: Props) {
  const action = saveContactForm.bind(null, locale ?? "en")
  const [state, formAction] = useActionState(action, { success: false })
  const formRef = useRef<HTMLFormElement>(null)

  useRestoreFormValues(formRef, state)

  return (
    <form action={formAction} ref={formRef}>
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
        <Input
          name={"company_name"}
          label={dictionary.forms.companyName}
          errorMessage={state?.errors?.company_name ?? []}
          defaultValue={state?.values?.company_name}
        />
        <Input
          name={"job_function"}
          label={dictionary.forms.jobFunction}
          errorMessage={state?.errors?.job_function ?? []}
          defaultValue={state?.values?.job_function}
        />
        <Textarea
          label={dictionary.forms.message}
          name={"message"}
          errorMessage={state?.errors?.message ?? []}
          defaultValue={state?.values?.message}
        />
        <Checkbox
          name="privacy_policy"
          label={dictionary.forms.acceptPrivacyPolicy}
          errorMessage={state?.errors?.privacy_policy ?? []}
          defaultChecked={state?.values?.privacy_policy}
        />
        <Altcha errorMessage={state?.errors?.altcha ?? []} />
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
