import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"

type Props = {
  props: SectionProps
  title: string | null
}
export default function RegularFormSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title ?? ""} data-testid="project-cards">
        dingen
      </SectionGroup>
      ding
    </Container>
  )
}
