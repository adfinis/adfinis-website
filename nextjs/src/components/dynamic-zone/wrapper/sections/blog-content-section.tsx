import TextImage from "@/components/text-image"
import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type Props = {
  props: SectionProps
  content: string
}

export default function BlogContentSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <div className="container sm:px-2">
        <div className="mx-auto mb-8 pb-8 max-w-4xl">
          <TextImage markdown={section.content} />
        </div>
      </div>
    </Container>
  )
}
