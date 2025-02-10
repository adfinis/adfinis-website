import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import Title from "@/components/title"
import React from "react"
import Short from "@/components/dynamic-zone/forms/short"
import Standard from "@/components/dynamic-zone/forms/standard"
import Contact from "@/components/dynamic-zone/forms/contact"
import EventForm from "@/components/dynamic-zone/forms/event-form"

type Props = {
  props: SectionProps
  submit_label: string
  title: string | null
  form_type: "short" | "standard" | "contact" | "event"
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
        <Short locale={locale} submitLabel={section.submit_label} />
      )}
      {section.form_type === "standard" && (
        <Standard locale={locale} submitLabel={section.submit_label} />
      )}
      {section.form_type === "contact" && (
        <Contact locale={locale} submitLabel={section.submit_label} />
      )}
      {section.form_type === "event" && (
        <EventForm locale={locale} submitLabel={section.submit_label} />
      )}
    </Container>
  )
}
