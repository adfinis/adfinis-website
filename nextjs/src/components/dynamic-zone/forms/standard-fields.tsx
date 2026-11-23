import FormColumns from "@/components/form/form-columns"
import Input from "@/components/form-fields/input"
import Email from "@/components/form-fields/email"
import Checkbox from "@/components/form-fields/checkbox"
import Altcha from "@/components/form-fields/altcha"
import Button from "@/components/button"
import { type FormState } from "@/lib/form-actions-shared"
import { type Dictionary } from "@/lib/get-dictionary.server"

type Props = {
  state: FormState
  submitLabel: string
  dictionary: Dictionary
  className?: string
}

/**
 * Fields of the standard form, shared by every form that collects the same
 * lead data (e.g. the regular standard form and the gated content form).
 */
export default function StandardFields({
  state,
  submitLabel,
  dictionary,
  className = "grid gap-4 max-w-4xl mx-auto mt-8",
}: Props) {
  return (
    <div className={className}>
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
  )
}
