import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import messages from "./messages"
import FormText from "./form-text"
import FormEmail from "./form-email"

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
          <div>
            <label htmlFor="job">Job</label>
            <Field as="select" id="job" name="job">
              <option value="">Select a job</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </Field>
            <ErrorMessage name="job" component="p" />
          </div>

          {/* Company Input */}
          <FormText id="company" name="company" label="Company" />

          {/* Name Input */}
          <FormText id="name" name="name" label="Name" />

          {/* Email Input */}
          <FormEmail id="email" name="email" label="Email" />

          {/* Phone Input */}
          <div>
            <label htmlFor="phone">Phone Number</label>
            <Field id="phone" name="phone" type="text" />
            <ErrorMessage name="phone" component="p" />
          </div>

          {/* Country Dropdown */}
          <div>
            <label htmlFor="country">Country</label>
            <Field as="select" id="country" name="country">
              <option value="">Select a country</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
            </Field>
            <ErrorMessage name="country" component="p" />
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default GetStartedForm
