import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import SectionCTA from "@/components/sections/section-cta"

type Props = {
  props: SectionProps
  cta?: CTA
  body?: string
  socials?: boolean
}

export default function CtaBanner({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup align={"center"}>
        <SectionCTA
          body={section.body}
          cta={section.cta}
          socials={section.socials}
        />
      </SectionGroup>
    </Container>
  )
}
