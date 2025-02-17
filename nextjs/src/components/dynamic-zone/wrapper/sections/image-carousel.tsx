import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/lib/cta"
import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardImage from "@/components/cards/card-image"

type Props = {
  title: string
  description: string
  props: SectionProps
  cta: CTA
  images: {
    url: string
    alternativeText: string
  }[]
}
export default function ImageCarousel({ section }: { section: Props }) {
  const ctas = section.cta ? [section.cta] : []
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={ctas}
      >
        {section.images.map((card, index) => {
          return (
            <CardSliderElement key={index}>
              <CardImage
                alt={card.alternativeText ?? ""}
                src={card.url}
                className="h-48 sm:h-96 w-auto"
              />
            </CardSliderElement>
          )
        })}
      </CardSlider>
    </Container>
  )
}
