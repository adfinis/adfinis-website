import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import ButtonGroup from "@/components/button-group"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"

type Props = {
  title: string
  // TODO Move to props
  background: "white" | "neutral" | "sapphire" | "stone"
  padding: "no-padding" | "both-padding"
  section_group_with_external_link: {
    title: string
    external_cta_link: CTA
  }
}
export default function HeadingWithLinkContainer({
  section,
}: {
  section: Props
}) {
  return (
    <Container background={section.background} padding={section.padding}>
      <SectionGroup
        title={section.section_group_with_external_link.title}
        align={"center"}
      >
        <ButtonGroup
          align={"center"}
          ctas={[
            {
              href: section.section_group_with_external_link.external_cta_link
                .href,
              size: section.section_group_with_external_link.external_cta_link
                .size,
              variant:
                section.section_group_with_external_link.external_cta_link
                  .variant,
              text: section.section_group_with_external_link.external_cta_link
                .label,
            },
          ]}
        />
      </SectionGroup>
    </Container>
  )
}
