import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardKpi from "@/components/cards/card-kpi"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type Kpi = {
  color:
    | "white"
    | "stone"
    | "biscay"
    | "sapphire"
    | "jumbo"
    | "neutral"
    | "sunglow"
    | "sky"
    | "cinnamon"
    | "green"
    | "razzmatazz"
    | "fuchsia"
    | "manhattan"
    | "grass"
    | "salmon"
    | "pink"
    | "purple"
  title: string
  description: string
  icon_image: {
    url?: string
  }
}

type Props = {
  props: SectionProps
  description: string
  kpis: Kpi[]
}

export default function KpiSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup align="center" text={section.description}>
        <CardGroup>
          {section.kpis.map((item, i: number) => (
            <CardKpi
              key={i}
              title={item.title}
              imageUrl={item.icon_image.url}
              description={item.description}
              color={item.color}
            />
          ))}
        </CardGroup>
      </SectionGroup>
    </Container>
  )
}
