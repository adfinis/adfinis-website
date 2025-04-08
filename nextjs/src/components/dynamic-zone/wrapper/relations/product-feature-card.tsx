import SectionGroup from "@/components/sections/section-group"
import { partnerSection } from "@/app/[locale]/theme/texts"
import SectionCardLogo from "@/components/sections/section-card-logo"
import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/lib/cta"

type ProductCard = {
  title: string
  description: string
  image?: {
    url?: string
  }
  ctas: CTA[]
}

type Props = {
  props: SectionProps
  title: string
  cards: ProductCard[]
}

export default function ProductFeatureCard({ section }: { section: Props }) {
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
              imageUrl={item.image?.url || ""}
              description={item.description}
              ctas={item.ctas}
            />
          )
        })}
      </SectionGroup>
    </Container>
  )
}
