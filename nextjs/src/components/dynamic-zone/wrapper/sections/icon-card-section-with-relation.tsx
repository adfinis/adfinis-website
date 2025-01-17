import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"

type Card = {
  icon_image: {
    url?: string
  }
  title: string
  description: string
  cta: CTA
}

type Props = {
  // TODO rename to props (strapi and next)
  section_props: SectionProps
  title: string | undefined
  cards: Card[]
}
export default function IconCardSectionWithRelation({
  section,
}: {
  section: Props
}) {
  return (
    <Container
      background={section.section_props.background}
      padding={section.section_props.padding}
    >
      <SectionGroup title={section.title}>
        <CardGroup>
          {section.cards.map((item, i: number) => {
            return (
              <CardIcon
                imageUrl={item.icon_image.url}
                title={item.title}
                description={item.description}
                cta={[item.cta].map(mapCta)[0]}
                key={`kpi_sections_${i}`}
              />
            )
          })}
        </CardGroup>
      </SectionGroup>
    </Container>
  )
}

// TODO move to lib/ or refactor components
const mapCta = (cta: any) => {
  if (!cta) return undefined
  return {
    text: cta.label,
    ...cta,
  }
}
