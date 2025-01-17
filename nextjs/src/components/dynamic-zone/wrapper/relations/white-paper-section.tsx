import Container from "@/components/container"
import SectionWhitepaper from "@/components/sections/section-whitepaper"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type WhitePaper = {
  title: string
  description: string
  download_file?: {
    url: string
  }
  cover_image?: {
    url: string
    alternativeText: string
  }
}

type Props = {
  props: SectionProps
  white_paper: WhitePaper
}

export default function WhitePaperSection({ section }: { section: Props }) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionWhitepaper
        title={section.white_paper.title}
        cta={{
          text: "Download white paper",
          href: section.white_paper.download_file?.url ?? "",
          variant: "cta",
          size: "large",
        }}
        image={{
          src: section.white_paper?.cover_image?.url ?? "",
          alt: section.white_paper?.cover_image?.alternativeText ?? "",
        }}
        text={section.white_paper.description}
      />
    </Container>
  )
}
