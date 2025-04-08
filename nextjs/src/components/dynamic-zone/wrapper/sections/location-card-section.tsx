import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import CardLocation from "@/components/cards/card-location"
import { Country as CareerCountry } from "@/components/icons/icon-flag"
import CardGroup from "@/components/cards/card-group"
import SectionGroup from "@/components/sections/section-group"

type Props = {
  props: SectionProps
  title: string
  cards: {
    title?: string
    description?: string
  }[]
}
export default function LocationCardSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title}>
        <CardGroup maxWidth="none" smColumns={2} lgColumns={3}>
          {section.cards.map((location, index) => (
            <CardLocation
              key={index}
              title={location.title || ""}
              description={location.description || ""}
            />
          ))}
        </CardGroup>
      </SectionGroup>
    </Container>
  )
}
