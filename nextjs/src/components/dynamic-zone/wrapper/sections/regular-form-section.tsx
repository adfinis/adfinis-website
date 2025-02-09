import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import Title from "@/components/title"
import React from "react"
import ShortForm from "@/components/dynamic-zone/wrapper/form/short-form"

type Props = {
  props: SectionProps
  submit_label: string
  title: string | null
  form_type: "short" | "standard"
}

export default function RegularFormSection({
  section,
  locale,
}: {
  section: Props
  locale?: string
}) {
  console.log("in regular form section locale:", locale)
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <Title align="center" boldness="light" markdown={section.title ?? ""} />
      <ShortForm locale={locale} submitLabel={section.submit_label} />
    </Container>
  )
}
