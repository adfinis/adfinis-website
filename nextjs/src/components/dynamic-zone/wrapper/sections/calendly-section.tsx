import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import SectionGroup from "@/components/sections/section-group"
import SectionCalendly from "@/components/sections/section-calendly"
import Container from "@/components/container"

type Props = {
  props: SectionProps
  title: string
  url: string
}

export default function CalendlySection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title}>
        <SectionCalendly url={section.url} />
      </SectionGroup>
    </Container>
  )
}
