import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import messages from "./messages"
import FormText from "./form-text"
import FormEmail from "./form-email"
import FormSelect from "./form-select"
import Button from "../button"
import FormTextarea from "./form-textarea"

type GetStartedFormProps = { locale: string }
const GetStartedForm: React.FC<GetStartedFormProps> = ({
  locale: routeLocale,
}) => {
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

  // Set the locale for required, email, min, max, oneOf
  Yup.setLocale({
    mixed: {
      required: ({ path }) => messages[locale].required, // You can change `en` to a dynamic language variable
    },
    string: {
      email: ({ path }) => messages[locale].email,
    },
  })

  const onSubmit = (values: any) => {
    console.log("Form Data:", values)
  }

  const validationSchema = Yup.object({
    job: Yup.string().required(),
    company: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    country: Yup.string().required(),
    date: Yup.date(),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="grid gap-4 max-w-4xl mx-auto">
          {/* Job Dropdown */}
          <FormSelect
            id="job"
            name="job"
            label="Job"
            options={[
              { value: "developer", label: "Developer" },
              { value: "designer", label: "Designer" },
              { value: "manager", label: "Manager" },
            ]}
          />

          {/* Company Input */}
          <FormText id="company" name="company" label="Company" />

          {/* Name Input */}
          <FormText id="name" name="name" label="Name" />

          {/* Email Input */}
          <FormEmail id="email" name="email" label="Email" />

          {/* Phone Input */}
          <FormText id="phone" name="phone" label="Phone Number" />

          <FormTextarea id="message" name="message" label="Message" />

          {/* Submit Button */}
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

export default GetStartedForm
