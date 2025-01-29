import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Image from "next/image"
import Title from "@/components/title"
import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import React from "react"

type ContentOffer = {
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
  content_offer: ContentOffer
}

export default function ContentHighlightSection({
  section,
}: {
  section: Props
}) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12 items-center">
        <Image
          className="rounded-xl max-h-64 lg:max-h-full w-auto mx-auto lg:order-1"
          src={section.content_offer?.cover_image?.url ?? ""}
          alt={section.content_offer?.cover_image?.alternativeText ?? ""}
          width={800}
          height={400}
        />

        <div className="col-span-2 grid gap-4 lg:gap-8 justify-items-start">
          <Title level={3} boldness={"semibold"}>
            {section.content_offer.title}
          </Title>
          <Text markdown={section.content_offer.description} />
          {section.content_offer.download_file && (
            <LinkButton
              href={section.content_offer.download_file.url}
              variant="cta"
              size="large"
            >
              Download
            </LinkButton>
          )}
        </div>
      </div>
    </Container>
  )
}
