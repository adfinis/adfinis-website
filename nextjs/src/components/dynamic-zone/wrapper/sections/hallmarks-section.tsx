import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Hallmarks from "@/components/stapi/hallmarks"
import Container from "@/components/container"

type Props = {
  props: SectionProps
  hallmark?: {
    documentId: string
  }
}

export default function HallmarksSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      {section.hallmark && (
        <Hallmarks hallmarksId={section.hallmark.documentId} />
      )}
    </Container>
  )
}
