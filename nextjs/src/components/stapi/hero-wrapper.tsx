import Title from "@/components/title"
import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import Hero from "@/components/hero"
import { colors } from "@/lib/colors"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"

type Props = {
  color: {
    color: keyof typeof colors
  }
  background_image: {
    url: string
  }
  title: string
  body: string
  cta: CTA
}

export default function HeroWrapper({ hero }: { hero: Props }) {
  return (
    <Hero color={hero.color.color} imageUrl={hero.background_image.url}>
      <Title markdown={hero.title} />
      <Text markdown={hero.body} />
      {hero.cta && (
        <LinkButton
          href={hero.cta.href}
          variant={hero.cta.variant}
          size={hero.cta.size}
        >
          {hero.cta.label}
        </LinkButton>
      )}
    </Hero>
  )
}
