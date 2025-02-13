import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/lib/cta"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import ButtonGroup from "@/components/button-group"
import Container from "@/components/container"

type Card = {
  icon_image: {
    url?: string
  }
  title: string
  description: string
  cta: CTA | null
}

type Props = {
  props: SectionProps
  title: string | null
  cta: CTA | null
  cards: Card[]
}
export default function ExtraWideIconCardsGridSection({
  section,
}: {
  section: Props
}) {
  return (
    <Container
      padding={section.props.padding}
      background={section.props.background}
    >
      <SectionGroup title={section.title ?? undefined} align="center">
        <CardGroup maxWidth="none">
          {section.cards.map((item, i) => {
            return (
              <CardIcon
                imageUrl={item.icon_image.url}
                title={item.title}
                description={item.description}
                cta={item.cta}
                key={i}
              />
            )
          })}
        </CardGroup>
        {section.cta && <ButtonGroup align={"center"} ctas={[section.cta]} />}
      </SectionGroup>
    </Container>
  )
}
