import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardArticle from "@/components/cards/card-article"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/lib/cta"

type Category = {
  name: string
  url: string
}

type CategoryCard = {
  title: string
  description: string
  subtitle: string
  image?: {
    url?: string
    alternativeText?: string | null
  }
  categories: Category[]
}

type Props = {
  props: SectionProps
  title: string
  description: string
  cta?: CTA
  cards: CategoryCard[]
}

export default function ContentCarousel({ section }: { section: Props }) {
  const ctas = section.cta ? [section.cta] : []
  return (
    <Container
      padding={section.props.padding}
      background={section.props.background}
    >
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={ctas}
      >
        {section.cards.map((card, index: number) => {
          return (
            <CardSliderElement key={index}>
              <CardArticle
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                imageUrl={card.image?.url || ""}
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
