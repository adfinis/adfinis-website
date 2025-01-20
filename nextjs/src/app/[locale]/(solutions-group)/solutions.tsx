import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import Title from "@/components/title"
import Text from "@/components/text"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import Intro from "@/components/intro"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import SectionCardWide from "@/components/sections/section-card-wide"
import ButtonGroup from "@/components/button-group"
import LinkButton from "@/components/link-button"
import CardService from "@/components/cards/card-service"
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"

const SUB_PAGE: any = {
  en: "solutions",
  nl: "oplossingen",
  de: "lösungen",
}

const mapCta = (cta: any) => ({
  // TODO Decide if we want to change CTA type or rename label to text in strapi
  text: cta.label,
  ...cta,
})

export default async function Solutions({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `solutions-overview?locale=${activeLocale.locale}&populate=localizations&populate=intro&populate=hero.background_image&populate=hero.cta&populate=hero.color&populate=kpi_sections.section_props&populate=kpi_sections.cards.icon_image&populate=kpi_sections.cards.cta&populate=soutions_section.section_props&populate=soutions_section.solutions&populate=soutions_section.solutions.solution_page&populate=soutions_section.solutions.card_image&populate=start_your_journey&populate=start_your_journey.section_group_with_external_link&populate=start_your_journey.section_group_with_external_link.external_cta_link&populate=sla_section.section_props&populate=sla_section.sla_cards.items&populate=combine_your_yourney.section_group_with_external_link.external_cta_link`

  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(activeLocale)

  const {
    hero,
    intro,
    kpi_sections,
    soutions_section,
    start_your_journey,
    sla_section,
    combine_your_yourney,
  } = data

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      {intro && (
        <Intro>
          <Title markdown={intro.intro_title} align="center" />
          <Text markdown={intro.intro_body} className="grid gap-8" />
        </Intro>
      )}
      {kpi_sections && (
        <Container
          background={kpi_sections.section_props.background}
          padding={kpi_sections.section_props.padding}
        >
          <SectionGroup title={kpi_sections.title}>
            <CardGroup hasDividers>
              {kpi_sections.cards.map((item: any, i: number) => {
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
      )}
      {soutions_section && (
        <Container
          background={soutions_section.section_props.background}
          padding={soutions_section.section_props.padding}
        >
          <SectionGroup title={soutions_section.title}>
            {soutions_section.solutions.map((item: any, i: number) => {
              return (
                <SectionCardWide
                  ctas={[]}
                  image={{ src: item.card_image.url, alt: "" }}
                  reverse={i % 2 === 1}
                  key={`soutions_section_solutions_${i}`}
                >
                  <Title level={3} boldness={"semibold"}>
                    {item.title}
                  </Title>
                  <Text markdown={item.description} />
                  <LinkButton
                    href={`/${activeLocale.locale}/${SUB_PAGE[activeLocale.locale]}/${item.solution_page.slug}`}
                  >
                    Read more
                  </LinkButton>
                </SectionCardWide>
              )
            })}
          </SectionGroup>
        </Container>
      )}
      {start_your_journey && (
        <Container
          background={start_your_journey.background}
          padding={start_your_journey.padding}
        >
          <SectionGroup
            title={start_your_journey.section_group_with_external_link.title}
            align={"center"}
          >
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  href: start_your_journey.section_group_with_external_link
                    .external_cta_link.href,
                  size: start_your_journey.section_group_with_external_link
                    .external_cta_link.size,
                  variant:
                    start_your_journey.section_group_with_external_link
                      .external_cta_link.variant,
                  text: start_your_journey.section_group_with_external_link
                    .external_cta_link.label,
                },
              ]}
            />
          </SectionGroup>
        </Container>
      )}
      {sla_section && (
        <Container
          background={sla_section.section_props.background}
          padding={sla_section.section_props.padding}
        >
          <SectionGroup title={sla_section.title}>
            <CardGroup hasDividers>
              {sla_section.sla_cards.map((item: any, i: number) => {
                return (
                  <CardService
                    usps={item.items.map((sla: any) => {
                      return {
                        text: sla.name,
                        active: !sla.is_disabled,
                      }
                    })}
                    title={item.name}
                    description=""
                    key={`sla_${i}`}
                  />
                )
              })}
            </CardGroup>
          </SectionGroup>
        </Container>
      )}
      {combine_your_yourney && (
        <Container
          background={combine_your_yourney.background}
          padding={combine_your_yourney.padding}
        >
          <SectionGroup
            title={combine_your_yourney.section_group_with_external_link.title}
            align={"center"}
          >
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  href: combine_your_yourney.section_group_with_external_link
                    .external_cta_link.href,
                  size: combine_your_yourney.section_group_with_external_link
                    .external_cta_link.size,
                  variant:
                    combine_your_yourney.section_group_with_external_link
                      .external_cta_link.variant,
                  text: combine_your_yourney.section_group_with_external_link
                    .external_cta_link.label,
                },
              ]}
            />
          </SectionGroup>
        </Container>
      )}
    </>
  )
}
