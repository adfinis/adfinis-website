import SectionGroup from "@/components/sections/section-group"
import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import LinkButton from "@/components/link-button"
import { CTA } from "@/lib/cta"
import TextImage from "@/components/text-image"

type Props = {
  props: SectionProps
  left_column: string
  right_column: string
  cta?: CTA
}

export default function TwoColumnSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup columns={2}>
        <TextImage markdown={section.left_column} />
        <TextImage markdown={section.right_column} />
        {section.cta && (
          <LinkButton {...section.cta} className="place-self-start">
            {section.cta.label}
          </LinkButton>
        )}
      </SectionGroup>
    </Container>
  )
}
