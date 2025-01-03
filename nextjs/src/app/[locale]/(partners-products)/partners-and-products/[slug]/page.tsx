import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import strapi from "@/lib/strapi"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import SectionGroup from "@/components/sections/section-group"
import Container from "@/components/container"
import type { colors } from "@/lib/colors"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: {
    locale: string
    slug: string
  }
}) {
  const url = `page-partner-and-products/${slug}`

  const currentLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }

  const { data } = await (await strapi(url)).json()

  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(currentLocale)
  // locales.push(activeLocale)

  const { hero, intro, sections } = data

  return (
    <>
      {hero && (
        <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
          <Title markdown={hero.title} />
          <Text markdown={hero.body} />
        </Hero>
      )}
      {intro && (
        <Intro>
          <Text markdown={intro.body} className="grid gap-8" />
        </Intro>
      )}
      {sections && sections.length > 0 && (
        <div>{sections.map(dynamicSection)}</div>
      )}
    </>
  )
}

type PickStringLiteral<A, B extends A> = B

type TwoColumnSection = {
  __component: string
  props: {
    background: PickStringLiteral<
      keyof typeof colors,
      "white" | "neutral" | "sapphire" | "stone"
    >
    padding: "no-padding" | "both-padding"
  }
  left_column: string
  right_column: string
}

type CTA = {
  label: string
  url: string
}

type IconCard = {
  icon_image: {
    url: string
  }
  title: string
  description: string
  cta: CTA
}
type IconCardSection = {
  __component: string
  section_props: {
    background: PickStringLiteral<
      keyof typeof colors,
      "white" | "neutral" | "sapphire" | "stone"
    >
    padding: "no-padding" | "both-padding"
  }
  title: string
  cards: IconCard[]
}

type SupportedSections = TwoColumnSection | IconCardSection

function dynamicSection(section: SupportedSections, index: number) {
  switch (section.__component) {
    case "sections.two-column-section":
      return (
        <Container
          key={`section_two_column_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionGroup columns={2}>
            <Text markdown={section.left_column} />
            <Text markdown={section.right_column} />
          </SectionGroup>
        </Container>
      )
    case "sections.icon-card-section-with-relation":
      return (
        <Container
          key={`section_icon_card_${index}`}
          background={section.section_props.background}
          padding={section.section_props.padding}
        >
          <SectionGroup title={section.title}>
            <CardGroup>
              {section.cards.map((item: any, i: number) => {
                return (
                  <CardIcon
                    imageUrl={item.icon_image.url}
                    title={item.title}
                    description={item.description}
                    cta={[item.cta].map(mapCta)[0]}
                    key={`kpi_sections_${i}`}
                  />
                )
              })}
            </CardGroup>
          </SectionGroup>
        </Container>
      )
    default:
      return <p key={`section_${index}`}>Unknown section</p>
  }
}

const mapCta = (cta: any) => {
  if (!cta) return undefined
  return {
    text: cta.label,
    ...cta,
  }
}
