import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import LinkButton from "@/components/link-button"
import Text from "@/components/text"
import InfoLabel from "@/components/info-label"

type Props = {
  props: SectionProps
  body: string | undefined
  cta: CTA
  infolabel?: string
}

export default function SingleColumnSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <div className="mx-auto max-w-4xl">
        {section.infolabel && (
          <InfoLabel text={section.infolabel} className="block mb-4" />
        )}
        {section.body && (
          <Text markdown={section.body} className="mb-8 max-w-4xl" />
        )}
        {section.cta && (
          <LinkButton {...section.cta}>{section.cta.label}</LinkButton>
        )}
      </div>
    </Container>
  )
}
