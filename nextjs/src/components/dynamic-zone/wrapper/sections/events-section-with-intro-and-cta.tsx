import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardArticle from "@/components/cards/card-article"

type CardCategory = {
  name: string
  url: string
}

type EventCard = {
  title: string
  description: string
  background_image: {
    url: string
    alternativeText: string | null
  }
  categories: CardCategory[]
}

type Props = {
  props: SectionProps
  title: string
  body: string
  cta: CTA
  events: EventCard[]
}

export default function EventsSectionWithIntroAndCta({
  section,
}: {
  section: Props
}) {
  return (
    <Container
      padding={section.props.padding}
      background={section.props.background}
    >
      <CardSlider
        title={section.title}
        description={section.body}
        ctas={[section.cta].map(mapCta)}
      >
        {section.events.map((card, index: number) => {
          return (
            <CardSliderElement key={index}>
              <CardArticle
                title={card.title}
                description={card.description}
                imageUrl={card.background_image.url}
                categories={card.categories.map((category) => ({
                  text: category.name,
                  href: category.url,
                }))}
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
