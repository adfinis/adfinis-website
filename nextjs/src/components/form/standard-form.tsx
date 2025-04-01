"use client"
import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormText from "./form-text"
import FormEmail from "./form-email"
import Button from "../button"
import FormCheckbox from "./form-checkbox"
import FormColumns from "./form-columns"
import { type Dictionary } from "@/lib/get-locale"

const StandardForm: React.FC<{ dictionary: Dictionary }> = ({ dictionary }) => {
  Yup.setLocale({
    mixed: {
      required: ({ path }) => dictionary.validation.required,
    },
    string: {
      email: ({ path }) => dictionary.validation.email,
    },
  })

  const onSubmit = (values: any) => {
    console.log("Form Data:", values)
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    job: "",
    privacyPolicy: false,
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    company: Yup.string().required(),
    job: Yup.string().required(),
    privacyPolicy: Yup.boolean().oneOf(
      [true],
      dictionary.validation.privacyPolicy,
    ),
  })

  const labels = {
    firstName: dictionary.forms.firstName,
    lastName: dictionary.forms.lastName,
    email: dictionary.forms.email,
    company: dictionary.forms.companyName,
    job: dictionary.forms.jobFunction,
    privacyPolicy: dictionary.forms.acceptPrivacyPolicy,
    submit: dictionary.forms.submitSuccessful,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form
          className="grid gap-4 max-w-4xl mx-auto"
          data-testid="standard-form"
        >
          <FormColumns>
            <FormText
              id="firstName"
              name="firstName"
              label={labels.firstName}
            />
            <FormText id="lastName" name="lastName" label={labels.lastName} />
          </FormColumns>
          <FormColumns>
            <FormText id="company" name="company" label={labels.company} />
            <FormText id="job" name="job" label={labels.job} />
          </FormColumns>
          <FormEmail id="email" name="email" label={labels.email} />
          <FormCheckbox
            id="privacyPolicy"
            name="privacyPolicy"
            label={labels.privacyPolicy}
          />
          <div className="w-full">
            <Button
              className="mx-auto"
              type="submit"
              data-testid="standard-form-submit"
            >
              {labels.submit}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default StandardForm
