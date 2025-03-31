"use client"
import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import messages from "./messages"
import FormText from "./form-text"
import FormEmail from "./form-email"
import Button from "../button"
import FormCheckbox from "./form-checkbox"
import FormColumns from "./form-columns"
import type { FormProps } from "./form"
import { Locale } from "@/hooks/useLocale"

const StandardForm: React.FC<FormProps> = ({ locale }) => {
  const getLabels = (locale: Locale) => {
    switch (locale) {
      case "en":
      case "en-US":
      case "en-AU":
        return {
          firstName: dictionary.forms.firstName,
          lastName: dictionary.forms.lastName,
          email: "Email",
          company: "Company",
          job: "Job",
          privacyPolicy: dictionary.forms.acceptPrivacyPolicy,
          submit: "Submit",
        }
      case "nl-NL":
        return {
          firstName: "Voornaam",
          lastName: "Achternaam",
          email: "E-mail",
          company: "Bedrijf",
          job: "Functie",
          privacyPolicy: "Ik accepteer het privacybeleid van Adfinis",
          submit: "Verzenden",
        }
      case "de-CH":
        return {
          firstName: "Vorname",
          lastName: "Nachname",
          email: "E-Mail",
          company: "Firma",
          job: "Beruf",
          privacyPolicy: "Ich akzeptiere die Datenschutzrichtlinie von Adfinis",
          submit: "Absenden",
        }
      case "de-DE":
        return {
          firstName: "Vorname",
          lastName: "Nachname",
          email: "E-Mail",
          company: "Firma",
          job: "Beruf",
          privacyPolicy: "Ich akzeptiere die Datenschutzrichtlinie von Adfinis",
          submit: "Absenden",
        }
      default:
        return {
          firstName: dictionary.forms.firstName,
          lastName: dictionary.forms.lastName,
          email: "Email",
          company: "Company",
          job: "Job",
          privacyPolicy: dictionary.forms.acceptPrivacyPolicy,
          submit: "Submit",
        }
    }
  }

  Yup.setLocale({
    mixed: {
      required: ({ path }) => messages[locale].required,
    },
    string: {
      email: ({ path }) => messages[locale].email,
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
    privacyPolicy: Yup.boolean().oneOf([true], messages[locale].privacyPolicy),
  })

  const labels = getLabels(locale)

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
