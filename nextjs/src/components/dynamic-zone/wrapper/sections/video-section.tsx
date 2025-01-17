import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import ExternalScript from "@/components/external-script"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type Props = {
  props: SectionProps
  section_title: string
  embed_html: string
}
export default function VideoSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.section_title}>
        <ExternalScript html={section.embed_html} className="w-full h-auto" />
      </SectionGroup>
    </Container>
  )
}
