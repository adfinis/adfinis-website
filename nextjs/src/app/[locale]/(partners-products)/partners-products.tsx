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
import SectionWhitepaper from "@/components/sections/section-whitepaper"
import SectionQuote from "@/components/sections/section-quote"
import ButtonGroup from "@/components/button-group"
import NavBar from "@/components/nav-bar/nav-bar"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"

export default async function PartnersProducts({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const url = `page-partner-and-products/${slug}?locale=${activeLocale.locale}`
  const { data } = await (await strapi(url)).json()

  const locales = data.localizations.map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/${SLUGS[item.locale]}/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )

  locales.push(activeLocale)

  const { hero, intro, sections } = data

  return (
    <>
      <NavBar items={locales} />
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
    case "relations.white-paper-section":
      return (
        <Container
          key={`section_white_paper_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionWhitepaper
            title={section.white_paper.title}
            cta={{
              text: "Download whitepaper",
              href: section.white_paper.download_file.url,
              variant: "cta",
              size: "large",
            }}
            image={{
              src: section.white_paper.cover_image.url,
              alt: section.white_paper.cover_image.alternativeText ?? "",
            }}
            text={section.white_paper.description}
          />
        </Container>
      )
    case "relations.quotes-relation":
      return (
        <Container key={`section_quote_${index}`}>
          <SectionGroup hasDividers>
            {section.quotes.length > 0 && section.quotes[0] && (
              <SectionQuote
                author={`${section.quotes[0].name} | ${section.quotes[0].tagline}`}
                image={section.quotes[0].image}
                quote={section.quotes[0].quote}
              />
            )}
          </SectionGroup>
        </Container>
      )
    case "sections.heading-with-link-container":
      return (
        <Container
          key={`section_heading_with_link_${index}`}
          background={section.background}
          padding={section.padding}
        >
          <SectionGroup
            title={section.section_group_with_external_link.title}
            align={"center"}
          >
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  href: section.section_group_with_external_link
                    .external_cta_link.href,
                  size: section.section_group_with_external_link
                    .external_cta_link.size,
                  variant:
                    section.section_group_with_external_link.external_cta_link
                      .variant,
                  text: section.section_group_with_external_link
                    .external_cta_link.label,
                },
              ]}
            />
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