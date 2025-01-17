import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionCardWide from "@/components/sections/section-card-wide"
import ExternalScript from "@/components/external-script"
import Text from "@/components/text"

type Props = {
  props: SectionProps
  section_title: string
  embed_html: string
  body: string
}

export default function VideoWithTextSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.section_title}>
        <SectionCardWide
          childrenWide={
            <ExternalScript
              html={section.embed_html}
              className="w-full h-auto"
            />
          }
        >
          <Text markdown={section.body} />
        </SectionCardWide>
      </SectionGroup>
    </Container>
  )
}
