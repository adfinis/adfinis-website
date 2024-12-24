import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import messages from "./messages"
import FormText from "./form-text"
import FormEmail from "./form-email"
import Button from "../button"
import FormTextarea from "./form-textarea"
import FormCheckbox from "./form-checkbox"

type StandardFormProps = { locale: string }

const StandardForm: React.FC<StandardFormProps> = ({ locale: routeLocale }) => {
  const getLocale = (input?: string) => {
    switch (input) {
      case "en-US":
        return "en-US"
      case "en-AU":
        return "en-AU"
      case "nl-NL":
        return "nl-NL"
      case "de-CH":
        return "de-CH"
      case "de-DE":
        return "de-DE"
      default:
        return "en-US"
    }
  }

  const locale = getLocale(routeLocale)

  const initialValues = {
    job: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    country: "",
  }

  const getLabels = (locale: ReturnType<typeof getLocale>) => {
    switch (locale) {
      case "en-US":
        return {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          company: "Company",
          job: "Job",
          privacyPolicy: "Privacy Policy",
        }
      case "en-AU":
        return {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          company: "Company",
          job: "Job",
          privacyPolicy: "Privacy Policy",
        }
      case "nl-NL":
        return {
          firstName: "Voornaam",
          lastName: "Achternaam",
          email: "E-mail",
          company: "Bedrijf",
          job: "Functie",
          privacyPolicy: "Privacybeleid",
        }
      case "de-CH":
        return {
          firstName: "Vorname",
          lastName: "Nachname",
          email: "E-Mail",
          company: "Firma",
          job: "Beruf",
          privacyPolicy: "Datenschutzrichtlinie",
        }
      case "de-DE":
        return {
          firstName: "Vorname",
          lastName: "Nachname",
          email: "E-Mail",
          company: "Firma",
          job: "Beruf",
          privacyPolicy: "Datenschutzrichtlinie",
        }
      default:
        return {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          company: "Company",
          job: "Job",
          privacyPolicy: "Privacy Policy",
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

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    company: Yup.string().required(),
    job: Yup.string().required(),
    privacyPolicy: Yup.boolean(),
  })

  const labels = getLabels(locale)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="grid gap-4 max-w-4xl mx-auto">
          <FormText id="firstName" name="firstName" label={labels.firstName} />
          <FormText id="lastName" name="lastName" label={labels.lastName} />
          <FormText id="company" name="company" label={labels.company} />
          <FormEmail id="email" name="email" label={labels.email} />
          <FormCheckbox
            id="privacy"
            name="privacy"
            label={labels.privacyPolicy}
          />
          <div className="w-full">
            <Button className="mx-auto" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default StandardForm
