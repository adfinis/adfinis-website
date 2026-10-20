"use client"

import { useRef, useActionState } from "react"
import StandardFields from "@/components/dynamic-zone/forms/standard-fields"
import { saveStandardForm } from "@/app/actions"
import { useRestoreFormValues } from "@/components/form/use-restore-form-values"
import { useRedditLead } from "@/components/reddit/use-reddit-lead"
import { useLinkedInConversion } from "@/components/linkedin/use-linkedin-conversion"
import { useFormConfirmation } from "@/components/form/use-form-confirmation"
import FormConfirmation from "@/components/form/form-confirmation"
import { type Dictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type Props = {
  locale: Locale
  submitLabel: string
  dictionary: Dictionary
}
export default function Standard({ submitLabel, dictionary, locale }: Props) {
  const action = saveStandardForm.bind(null, locale ?? "en")
  const [state, formAction] = useActionState(action, { success: false })
  const formRef = useRef<HTMLFormElement>(null)

  useRestoreFormValues(formRef, state)
  useRedditLead(state)
  useLinkedInConversion(state)
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
        <StandardFields
          state={state}
          submitLabel={submitLabel}
          dictionary={dictionary}
        />
      )}
    </form>
  )
}
