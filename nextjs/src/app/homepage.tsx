import NavBar from "@/components/nav-bar/nav-bar"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import LinkButton from "@/components/link-button"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardColored from "@/components/cards/card-colored"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionCardWide from "@/components/sections/section-card-wide"
import ButtonGroup from "@/components/button-group"
import Hallmarks from "@/components/stapi/hallmarks"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import CardArticle from "@/components/cards/card-article"
import CardCounter from "@/components/cards/card-counter"

const mapCta = (cta) => ({
  // TODO Decide if we want to change CTA type or rename label to text in strapi
  text: cta.label,
  ...cta,
})

export default async function Homepage({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `homepage?locale=${activeLocale.locale}&populate=localizations&populate=hero.cta&populate=intro&populate=our_solutions.intro&populate=our_solutions.color_cards&populate=our_solutions.intro.external_ctas&populate=our_projects.projects.ctas&populate=meet_our_partners.ctas&populate=our_partners&populate=shape_your_journey.section_props&populate=shape_your_journey.cards.ctas&populate=start_your_journey.section_group_with_external_link.external_cta_link&populate=our_resources.cta&populate=our_resources.section_props&populate=our_resources.events.categories&populate=who_are_we.projects.ctas&populate=more_on_adfinis.kpis&populate=more_on_adfinis.hallmark&populate=start_your_career.section_group_with_external_link.external_cta_link`
  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: item.locale === "en" ? "/" : `/${item.locale}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(activeLocale)

  const {
    hero,
    intro,
    our_solutions,
    our_projects,
    meet_our_partners,
    our_partners,
    shape_your_journey,
    start_your_journey,
    our_resources,
    who_are_we,
    more_on_adfinis,
    start_your_career,
  } = data

  return (
    <>
      <NavBar items={locales} />
      {hero && (
        <Hero color="white" imageUrl={hero.image}>
          <Title markdown={hero.title} />
          <Text markdown={hero.description} />
          <LinkButton
            href={hero.cta.href}
            size={hero.cta.size}
            variant={hero.cta.variant}
          >
            {hero.cta.label}
          </LinkButton>
        </Hero>
      )}
      {intro && (
        <Intro>
          <Title markdown={intro.intro_title} align="center" />
          <Text markdown={intro.intro_body} className="grid gap-8" />
        </Intro>
      )}
      {our_solutions && (
        <Container padding={"start-padding"} background="neutral">
          <CardSlider
            title={our_solutions.intro.title}
            description={our_solutions.intro.body}
            ctas={our_solutions.intro.external_ctas.map(mapCta)}
          >
            {our_solutions.color_cards.map((card, index) => {
              return (
                <CardSliderElement key={`our_solutions_card_${index}`}>
                  <CardColored
                    color={card.color}
                    title={card.title}
                    description={card.description}
                  />
                </CardSliderElement>
              )
            })}
          </CardSlider>
        </Container>
      )}
      {our_projects && (
        <Container background="stone" padding="both-padding">
          <SectionGroup>
            {our_projects.projects.map((item, i) => {
              return (
                <SectionCardWide
                  reverse={i % 2 === 0}
                  image={
                    // TODO support alt and rename image to src in strap
                    { src: item.image, alt: "" }
                  }
                  key={i}
                  ctas={item.ctas.map(mapCta)}
                >
                  <Title level={3} boldness={"semibold"}>
                    {item.title}
                  </Title>
                  <Text markdown={item.intro} />
                </SectionCardWide>
              )
            })}
            {meet_our_partners && (
              <Container background="white" padding="both-padding">
                <SectionGroup
                  title={meet_our_partners.title}
                  text={meet_our_partners.intro}
                  align="center"
                >
                  <ButtonGroup
                    ctas={meet_our_partners.ctas.map(mapCta)}
                    align={"center"}
                  />
                  <Hallmarks hallmarksId={our_partners.documentId} />
                </SectionGroup>
              </Container>
            )}
          </SectionGroup>
        </Container>
      )}
      {shape_your_journey && (
        <Container
          background={shape_your_journey.section_props.background}
          padding={shape_your_journey.section_props.padding}
        >
          <SectionGroup title={shape_your_journey.title}>
            <CardGroup>
              {shape_your_journey.cards.map((item, i) => {
                const iconMap = {
                  icon_build: "/svg/icons/icon_build.svg",
                  icon_calendar: "/svg/icons/icon_calendar.svg",
                  icon_compliance: "/svg/icons/icon_compliance.svg",
                  icon_employees: "/svg/icons/icon_employees.svg",
                }
                return (
                  <CardIcon
                    imageUrl={iconMap[item.icon]}
                    title={item.title}
                    description={item.description}
                    // TODO only support one CTA in strapi
                    cta={item.ctas.map(mapCta)[0]}
                    key={`card_icon_shape_journey_${i}`}
                  />
                )
              })}
            </CardGroup>
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
      {our_resources && (
        <Container
          padding={our_resources.section_props.padding}
          background={our_resources.section_props.background}
        >
          <CardSlider
            title={our_resources.title}
            description={our_resources.body}
            ctas={[our_resources.cta].map(mapCta)}
          >
            {our_resources.events.map((card, index) => {
              // TODO our_resources.events is missing images
              return (
                <CardSliderElement key={index}>
                  <CardArticle
                    title={card.title}
                    description={card.description}
                    imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMGJ1c2luZXNzfGVufDB8fDB8fHwy"
                    categories={card.categories.map((category) => ({
                      text: category.name,
                      href: category.href,
                    }))}
                  />
                </CardSliderElement>
              )
            })}
          </CardSlider>
        </Container>
      )}
      {who_are_we && (
        <Container background="stone" padding="both-padding">
          <SectionGroup>
            {who_are_we.projects.map((item, i) => {
              return (
                <SectionCardWide
                  reverse={i % 2 === 0}
                  image={{ src: item.image, alt: "" }}
                  key={i}
                  ctas={item.ctas.map(mapCta)}
                >
                  <Title level={3} boldness={"semibold"}>
                    {item.title}
                  </Title>
                  <Text markdown={item.intro} />
                </SectionCardWide>
              )
            })}
          </SectionGroup>
        </Container>
      )}
      {more_on_adfinis && (
        <Container background="neutral" padding="both-padding">
          <SectionGroup
            align="center"
            title={more_on_adfinis.title}
            text={more_on_adfinis.description}
          >
            <CardGroup>
              {more_on_adfinis.kpis.map((item, i) => (
                <CardCounter
                  key={i}
                  title={item.title}
                  imageUrl={item.image}
                  description={item.description}
                />
              ))}
            </CardGroup>
            <Hallmarks hallmarksId={more_on_adfinis.hallmark.documentId} />
          </SectionGroup>
        </Container>
      )}
      {start_your_career && (
        <Container
          background={start_your_career.background}
          padding={start_your_career.padding}
        >
          <SectionGroup
            title={start_your_career.section_group_with_external_link.title}
            align={"center"}
          >
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  ...start_your_career.section_group_with_external_link
                    .external_cta_link,
                  text: start_your_career.section_group_with_external_link
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
