import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardCounter from "@/components/cards/card-counter"
import Hallmarks from "@/components/stapi/hallmarks"
import { colors } from "@/lib/colors"

type Kpi = {
  color: keyof typeof colors
  title: string
  description: string
  icon_image: {
    url?: string
  }
}

type Props = {
  title: string
  description: string
  kpis: Kpi[]
  hallmark: {
    documentId: string
  }
}

export default function KpiWithIntroAndHallmarksSection({
  section,
}: {
  section: Props
}) {
  return (
    <Container background="neutral" padding="both-padding">
      <SectionGroup
        align="center"
        title={section.title}
        text={section.description}
      >
        <CardGroup>
          {section.kpis.map((item, i: number) => (
            <CardCounter
              key={i}
              title={item.title}
              imageUrl={item.icon_image.url}
              description={item.description}
              color={item.color}
            />
          ))}
        </CardGroup>
        <Hallmarks hallmarksId={section.hallmark.documentId} />
      </SectionGroup>
    </Container>
  )
}
