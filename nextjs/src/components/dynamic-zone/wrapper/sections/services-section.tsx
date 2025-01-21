import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import { CardMessage } from "@/components/cards/card-message"
import Container from "@/components/container"

type SimpleCard = {
  title: string
  description: string
}

type Props = {
  title: string
  description: string
  props: SectionProps
  ctas: CTA[]
  cards: SimpleCard[]
}
export default function ServicesSection({ section }: { section: Props }) {
  return (
    <Container
      padding={section.props.padding}
      background={section.props.background}
    >
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={section.ctas.map(mapCta)}
      >
        {section.cards.map((card, index) => {
          return (
            <CardSliderElement key={index}>
              <CardMessage title={card.title} description={card.description} />
            </CardSliderElement>
          )
        })}
      </CardSlider>
    </Container>
  )
}
const mapCta = (cta: any) => ({
  // TODO Decide if we want to change CTA type or rename label to text in strapi
  text: cta.label,
  ...cta,
})
