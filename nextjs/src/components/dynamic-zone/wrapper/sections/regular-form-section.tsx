import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import Title from "@/components/title"
import React from "react"
import ShortForm from "@/components/dynamic-zone/wrapper/form/short-form"
import StandardForm from "@/components/dynamic-zone/wrapper/form/standard-form"
import ContactForm from "@/components/dynamic-zone/wrapper/form/contact-form"

type Props = {
  props: SectionProps
  submit_label: string
  title: string | null
  form_type: "short" | "standard" | "contact"
}

export default function RegularFormSection({
  section,
  locale,
}: {
  section: Props
  locale?: string
}) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <Title align="center" boldness="light" markdown={section.title ?? ""} />
      {section.form_type === "short" && (
        <ShortForm locale={locale} submitLabel={section.submit_label} />
      )}
      {section.form_type === "standard" && (
        <StandardForm locale={locale} submitLabel={section.submit_label} />
      )}
      {section.form_type === "contact" && (
        <ContactForm locale={locale} submitLabel={section.submit_label} />
      )}
    </Container>
  )
}
