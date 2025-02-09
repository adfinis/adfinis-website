import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import FormColumns from "@/components/form/form-columns"
import InputField from "@/components/dynamic-zone/wrapper/form/input-field"
import Title from "@/components/title"
import React from "react"
import EmailField from "@/components/dynamic-zone/wrapper/form/email-field"
import Button from "@/components/button"

type Props = {
  props: SectionProps
  submit_label: string
  title: string | null
}

export default function RegularFormSection({ section }: { section: Props }) {
  const hasError = false
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <Title align="center" boldness="light" markdown={section.title ?? ""} />
      <div className="grid gap-4 max-w-4xl mx-auto mt-8">
        <FormColumns>
          <InputField
            name={"firstName"}
            label={"First name"}
            errorMessage={[]}
          />
          <InputField
            name={"firstName"}
            label={"Last name"}
            errorMessage={[]}
          />
        </FormColumns>
        <EmailField label={"e-mail"} name={"email"} errorMessage={[]} />
        <div className="w-full text-center">
          <Button variant={"cta"} name={"submit"}>
            {section.submit_label}
          </Button>
        </div>
      </div>
    </Container>
  )
}
