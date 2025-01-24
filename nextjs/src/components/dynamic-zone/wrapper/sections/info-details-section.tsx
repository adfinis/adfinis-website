import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import InfoLabel from "@/components/info-label"
import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import Container from "@/components/container"

type Props = {
  info: string
  description: string
  cta?: CTA
  props: SectionProps
}

export default function InfoDetailsSection({ section }: { section: Props }) {
  return (
    <Container background={section.props.background} padding="both-padding">
      <InfoLabel text={section.info} className="block mb-4" />
      <Text markdown={section.description} className="mb-8 max-w-4xl" />
      {section.cta && (
        <LinkButton
          href={section.cta.href}
          size={section.cta.size}
          variant={section.cta.variant}
        >
          {section.cta.label}
        </LinkButton>
      )}
    </Container>
  )
}
