import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardColored from "@/components/cards/card-colored"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import { colors } from "@/lib/colors"

type ColorCard = {
  color: keyof typeof colors
  title: string
  description: string
}

type Props = {
  title: string
  description: string
  ctas: CTA[]
  cards: ColorCard[]
}
export default function ColorCardSliderSection({
  section,
}: {
  section: Props
}) {
  return (
    <Container background="neutral">
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={section.ctas.map(mapCta)}
      >
        {section.cards.map((card, index: number) => {
          return (
            <CardSliderElement key={`ColorCardSliderSection_card_${index}`}>
              <CardColored
                color={card.color}
                title={card.title}
                description={card.description}
              />
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
