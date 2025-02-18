import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardColored from "@/components/cards/card-colored"
import { CTA } from "@/lib/cta"
import { colors } from "@/lib/colors"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type ColorCard = {
  color: keyof typeof colors
  title: string
  description: string
  href?: string
}

type Props = {
  title: string
  description: string
  props: SectionProps
  ctas: CTA[]
  cards: ColorCard[]
}
export default function ColorCardCarousel({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={section.ctas}
      >
        {section.cards.map((card, index: number) => {
          return (
            <CardSliderElement key={`ColorCardCarousel_card_${index}`}>
              <CardColored
                color={card.color}
                title={card.title}
                description={card.description}
                href={card.href}
              />
            </CardSliderElement>
          )
        })}
      </CardSlider>
    </Container>
  )
}
