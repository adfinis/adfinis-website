import SectionGroup from "@/components/sections/section-group"
import { partnerSection } from "@/app/[locale]/theme/texts"
import SectionCardLogo from "@/components/sections/section-card-logo"
import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"

type ProductCard = {
  title: string
  description: string
  image: {
    url: string
  }
  ctas: CTA[]
}

type Props = {
  props: SectionProps
  title: string
  cards: ProductCard[]
}

export default function ProductCardsSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title} hasDividers>
        {section.cards.map((item, i) => {
          return (
            <SectionCardLogo
              key={i}
              title={item.title}
              imageUrl={item.image.url}
              description={item.description}
              ctas={item.ctas.map(mapCta)}
            />
          )
        })}
      </SectionGroup>
    </Container>
  )
}

const mapCta = (cta: any) => ({
  // TODO Decide if we want to change CTA type or rename label to text in strapi
  text: cta.label,
  ...cta,
})
