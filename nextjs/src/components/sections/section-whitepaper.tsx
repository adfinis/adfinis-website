import { CTA } from "@/lib/cta"
import React from "react"
import Image from "next/image"
import LinkButton from "@/components/link-button"
import Title from "../title"
import Text from "../text"

type SectionWhitepaperProps = {
  title: string
  /**
   * @info can be passed markdown or plain text.
   */
  text: string
  cta: CTA
  image: {
    src: string
    alt: string
  }
}

const SectionWhitepaper: React.FC<SectionWhitepaperProps> = ({
  title,
  text,
  cta,
  image: { src, alt },
}) => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12 items-center">
      <Image
        className="rounded-xl max-h-64 lg:max-h-full w-auto mx-auto lg:order-1"
        src={src}
        alt={alt}
        width={800}
        height={400}
      />

      <div className="col-span-2 grid gap-4 lg:gap-8 justify-items-start">
        <Title level={3} boldness={"semibold"}>
          {title}
        </Title>
        <Text markdown={text} />
        <LinkButton href={cta.href} variant={cta.variant} size={cta.size}>
          {cta.text}
        </LinkButton>
      </div>
    </div>
  )
}

export default SectionWhitepaper
