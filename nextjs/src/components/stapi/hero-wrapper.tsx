import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import Hero from "@/components/hero"
import { colors } from "@/lib/colors"
import { CTA } from "@/lib/cta"

type Props = {
  color: {
    color: keyof typeof colors
  }
  background_image: {
    url?: string
  }
  body: string
  cta?: CTA
  logo?: {
    url: string
  }
}

export default function HeroWrapper({ hero }: { hero: Props }) {
  return (
    <Hero
      color={hero.color.color}
      imageUrl={hero.background_image?.url || ""}
      logoUrl={hero.logo?.url}
    >
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
