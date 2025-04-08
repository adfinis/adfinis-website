import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import CardCareer from "@/components/cards/card-career"
import { Country as CareerCountry } from "@/components/icons/icon-flag"
import CardGroup from "@/components/cards/card-group"

type Props = {
  props: SectionProps
  cards: {
    title: string
    description: string
    workload: string
    location: string
    url: string
    country: CareerCountry
    image?: {
      url?: string
    }
  }[]
}
export default function CareerCardSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <CardGroup maxWidth="none" lgColumns={3}>
        {section.cards.map((career, index) => (
          <CardCareer
            key={index}
            title={career.title}
            description={career.description}
            imageUrl={career.image?.url || ""}
            workload={career.workload}
            location={career.location}
            country={career.country}
            href={career.url}
          />
        ))}
      </CardGroup>
    </Container>
  )
}
