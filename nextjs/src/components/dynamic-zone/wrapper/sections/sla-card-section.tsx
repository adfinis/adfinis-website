import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardService from "@/components/cards/card-service"

type SLACardItem = {
  name: string
  is_disabled: boolean
}

type SLACard = {
  name: string
  items: SLACardItem[]
}

type Props = {
  props: SectionProps
  title: string
  cards: SLACard[]
}
export default function SlaCardSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title}>
        <CardGroup hasDividers>
          {section.cards.map((item, i: number) => {
            return (
              <CardService
                usps={item.items.map((sla) => {
                  return {
                    text: sla.name,
                    active: !sla.is_disabled,
                  }
                })}
                title={item.name}
                description=""
                key={`sla_item_${i}`}
              />
            )
          })}
        </CardGroup>
      </SectionGroup>
    </Container>
  )
}
