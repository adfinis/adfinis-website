import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import strapi from "@/lib/strapi"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionCardWide from "@/components/sections/section-card-wide"
import LinkButton from "@/components/link-button"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import ButtonGroup from "@/components/button-group"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardArticle from "@/components/cards/card-article"
import NavBar from "@/components/nav-bar/nav-bar"
import { NavProvider } from "@/components/nav-bar/nav-context"

const SUB_PAGE = {
  en: "solutions",
  nl: "oplossingen",
  de: "lösungen",
}

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const currentLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }
  const url = `solutions-pages/?locale=${locale}&filters[slug]=${slug}&populate=localizations&populate=hero.backround_image&populate=hero.color&populate=intro&populate=project_cards.cards.image&populate=project_cards.cards.cta&populate=kpis.section_props&populate=kpis.cards.icon_image&populate=kpis.cta&populate=start_your_journey.section_group_with_external_link.external_cta_link&populate=case_studies.cta&populate=case_studies.section_props&populate=case_studies.events.categories&populate=case_studies.events.background_image`
  const { data } = await (await strapi(url)).json()
  const page = data[0]
  const locales = page.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(currentLocale)

  const { hero, intro, project_cards, kpis, start_your_journey, case_studies } =
    page

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && (
          <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
            <Title markdown={hero.title} />
            <Text markdown={hero.body} />
          </Hero>
        )}
      </NavProvider>

      {intro && (
        <Intro>
          <Title markdown={intro.intro_title} />
          <Text markdown={intro.intro_body} className="grid gap-8" />
        </Intro>
      )}
      {project_cards && (
        <Container background="stone" padding="both-padding">
          <SectionGroup title={project_cards.title} data-testid="project-cards">
            <Text
              markdown={project_cards.description}
              className="text-center"
            />
            {project_cards.cards.map((item: any, i: number) => {
              return (
                <SectionCardWide
                  ctas={[]}
                  image={{ src: item.image.url, alt: "" }}
                  reverse={i % 2 === 1}
                  key={`project_cards${i}`}
                >
                  <Title level={3} boldness={"semibold"}>
                    {item.title}
                  </Title>
                  <Text markdown={item.intro} />
                  <LinkButton
                    href={`${item.cta.href}`}
                    variant={item.cta.variant}
                  >
                    {item.cta.label}
                  </LinkButton>
                </SectionCardWide>
              )
            })}
          </SectionGroup>
        </Container>
      )}
      {kpis && (
        <Container
          background={kpis.section_props.background}
          padding={kpis.section_props.padding}
        >
          <SectionGroup title={kpis.title} data-testid="kpis" align={"center"}>
            <CardGroup hasDividers>
              {kpis.cards.map((item: any, i: number) => {
                return (
                  <CardIcon
                    // @ts-ignore
                    imageUrl={item.icon_image.url}
                    title={item.title}
                    description={item.description}
                    cta={undefined}
                    key={`card_icon_shape_journey_${i}`}
                  />
                )
              })}
            </CardGroup>
            {kpis.cta && (
              <LinkButton href={kpis.cta.href} variant={kpis.cta.variant}>
                {kpis.cta.label}
              </LinkButton>
            )}
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
            data-testid="start-your-journey"
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
      {case_studies && (
        <Container
          padding={case_studies.section_props.padding}
          background={case_studies.section_props.background}
        >
          <CardSlider
            title={case_studies.title}
            description={case_studies.body}
            ctas={[case_studies.cta].map(mapCta)}
          >
            {case_studies.events.map((card: any, index: number) => {
              // TODO our_resources.events is missing images
              return (
                <CardSliderElement key={index}>
                  <CardArticle
                    title={card.title}
                    description={card.description}
                    imageUrl={card.background_image.url}
                    categories={card.categories.map((category: any) => ({
                      text: category.name,
                      href: category.url,
                    }))}
                  />
                </CardSliderElement>
              )
            })}
          </CardSlider>
        </Container>
      )}
    </>
  )
}
const mapCta = (cta: any) => ({
  // TODO Decide if we want to change CTA type or rename label to text in strapi
  text: cta.label,
  ...cta,
})
