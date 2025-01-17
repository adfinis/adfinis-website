import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import ButtonGroup from "@/components/button-group"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"

type Props = {
  props: SectionProps
  cta: CTA
  body: string | undefined
}

export default function TextSectionWithCta({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.body} align={"center"}>
        <ButtonGroup
          align={"center"}
          ctas={[
            {
              href: section.cta.href,
              size: section.cta.size,
              variant: section.cta.variant,
              text: section.cta.label,
            },
          ]}
        />
      </SectionGroup>
    </Container>
  )
}
