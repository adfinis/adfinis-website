import NavBar from "@/components/nav-bar/nav-bar"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
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
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { renderSections } from "@/components/dynamic-zone/render-sections"

export default async function Homepage({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `homepage?locale=${activeLocale.locale}`
  const { data } = await (await strapi(url)).json()
  const locales = (data?.localizations ?? []).map(
    (item: { locale: string }) => {
      return {
        href: item.locale === "en" ? "/" : `/${item.locale}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
  locales.push(activeLocale)

  const { hero, intro, sections } = data ?? {}

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      {intro && (
        <Intro>
          <Text markdown={intro} className="grid gap-8" />
        </Intro>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}

      {/*{our_projects && (*/}
      {/*  <Container background="stone" padding="both-padding">*/}
      {/*    <SectionGroup>*/}
      {/*      {our_projects.projects.map((item: any, i: number) => {*/}
      {/*        return (*/}
      {/*          <SectionCardWide*/}
      {/*            reverse={i % 2 === 1}*/}
      {/*            image={*/}
      {/*              // TODO support alt and rename image to src in strap*/}
      {/*              { src: item.image.url, alt: "" }*/}
      {/*            }*/}
      {/*            key={i}*/}
      {/*            ctas={[item.cta].map(mapCta)}*/}
      {/*          >*/}
      {/*            <Title level={3} boldness={"semibold"}>*/}
      {/*              {item.title}*/}
      {/*            </Title>*/}
      {/*            <Text markdown={item.intro} />*/}
      {/*          </SectionCardWide>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{meet_our_partners && (*/}
      {/*  <Container background="white" padding="both-padding">*/}
      {/*    <SectionGroup*/}
      {/*      title={meet_our_partners.title}*/}
      {/*      text={meet_our_partners.intro}*/}
      {/*      align="center"*/}
      {/*    >*/}
      {/*      <ButtonGroup*/}
      {/*        ctas={meet_our_partners.ctas.map(mapCta)}*/}
      {/*        align={"center"}*/}
      {/*      />*/}
      {/*      <Hallmarks hallmarksId={our_partners.documentId} />*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{shape_your_journey && (*/}
      {/*  <Container*/}
      {/*    background={shape_your_journey.section_props.background}*/}
      {/*    padding={shape_your_journey.section_props.padding}*/}
      {/*  >*/}
      {/*    <SectionGroup title={shape_your_journey.title}>*/}
      {/*      <CardGroup>*/}
      {/*        {shape_your_journey.cards.map((item: any, i: number) => {*/}
      {/*          const iconMap = {*/}
      {/*            icon_build: "/svg/icons/icon_build.svg",*/}
      {/*            icon_calendar: "/svg/icons/icon_calendar.svg",*/}
      {/*            icon_compliance: "/svg/icons/icon_compliance.svg",*/}
      {/*            icon_employees: "/svg/icons/icon_employees.svg",*/}
      {/*          }*/}
      {/*          return (*/}
      {/*            <CardIcon*/}
      {/*              // @ts-ignore*/}
      {/*              imageUrl={iconMap[item.icon]}*/}
      {/*              title={item.title}*/}
      {/*              description={item.description}*/}
      {/*              // TODO only support one CTA in strapi*/}
      {/*              cta={item.ctas.map(mapCta)[0]}*/}
      {/*              key={`card_icon_shape_journey_${i}`}*/}
      {/*            />*/}
      {/*          )*/}
      {/*        })}*/}
      {/*      </CardGroup>*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{start_your_journey && (*/}
      {/*  <Container*/}
      {/*    background={start_your_journey.background}*/}
      {/*    padding={start_your_journey.padding}*/}
      {/*  >*/}
      {/*    <SectionGroup*/}
      {/*      title={start_your_journey.section_group_with_external_link.title}*/}
      {/*      align={"center"}*/}
      {/*    >*/}
      {/*      <ButtonGroup*/}
      {/*        align={"center"}*/}
      {/*        ctas={[*/}
      {/*          {*/}
      {/*            href: start_your_journey.section_group_with_external_link*/}
      {/*              .external_cta_link.href,*/}
      {/*            size: start_your_journey.section_group_with_external_link*/}
      {/*              .external_cta_link.size,*/}
      {/*            variant:*/}
      {/*              start_your_journey.section_group_with_external_link*/}
      {/*                .external_cta_link.variant,*/}
      {/*            text: start_your_journey.section_group_with_external_link*/}
      {/*              .external_cta_link.label,*/}
      {/*          },*/}
      {/*        ]}*/}
      {/*      />*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{our_resources && (*/}
      {/*  <Container*/}
      {/*    padding={our_resources.section_props.padding}*/}
      {/*    background={our_resources.section_props.background}*/}
      {/*  >*/}
      {/*    <CardSlider*/}
      {/*      title={our_resources.title}*/}
      {/*      description={our_resources.body}*/}
      {/*      ctas={[our_resources.cta].map(mapCta)}*/}
      {/*    >*/}
      {/*      {our_resources.events.map((card: any, index: number) => {*/}
      {/*        // TODO our_resources.events is missing images*/}
      {/*        return (*/}
      {/*          <CardSliderElement key={index}>*/}
      {/*            <CardArticle*/}
      {/*              title={card.title}*/}
      {/*              description={card.description}*/}
      {/*              imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMGJ1c2luZXNzfGVufDB8fDB8fHwy"*/}
      {/*              categories={card.categories.map((category: any) => ({*/}
      {/*                text: category.name,*/}
      {/*                href: category.url,*/}
      {/*              }))}*/}
      {/*            />*/}
      {/*          </CardSliderElement>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </CardSlider>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{who_are_we && (*/}
      {/*  <Container background="stone" padding="both-padding">*/}
      {/*    <SectionGroup>*/}
      {/*      {who_are_we.projects.map((item: any, i: number) => {*/}
      {/*        return (*/}
      {/*          <SectionCardWide*/}
      {/*            reverse={i % 2 === 1}*/}
      {/*            image={{ src: item.image.formats.large.url, alt: "" }}*/}
      {/*            key={i}*/}
      {/*            ctas={[item.cta].map(mapCta)}*/}
      {/*          >*/}
      {/*            <Title level={3} boldness={"semibold"}>*/}
      {/*              {item.title}*/}
      {/*            </Title>*/}
      {/*            <Text markdown={item.intro} />*/}
      {/*          </SectionCardWide>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{more_on_adfinis && (*/}
      {/*  <Container background="neutral" padding="both-padding">*/}
      {/*    <SectionGroup*/}
      {/*      align="center"*/}
      {/*      title={more_on_adfinis.title}*/}
      {/*      text={more_on_adfinis.description}*/}
      {/*    >*/}
      {/*      <CardGroup>*/}
      {/*        {more_on_adfinis.kpis.map((item: any, i: number) => (*/}
      {/*          <CardCounter*/}
      {/*            key={i}*/}
      {/*            title={item.title}*/}
      {/*            imageUrl={item.icon_image.url}*/}
      {/*            description={item.description}*/}
      {/*          />*/}
      {/*        ))}*/}
      {/*      </CardGroup>*/}
      {/*      <Hallmarks hallmarksId={more_on_adfinis.hallmark.documentId} />*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
      {/*{start_your_career && (*/}
      {/*  <Container*/}
      {/*    background={start_your_career.background}*/}
      {/*    padding={start_your_career.padding}*/}
      {/*  >*/}
      {/*    <SectionGroup*/}
      {/*      title={start_your_career.section_group_with_external_link.title}*/}
      {/*      align={"center"}*/}
      {/*    >*/}
      {/*      <ButtonGroup*/}
      {/*        align={"center"}*/}
      {/*        ctas={[*/}
      {/*          {*/}
      {/*            ...start_your_career.section_group_with_external_link*/}
      {/*              .external_cta_link,*/}
      {/*            text: start_your_career.section_group_with_external_link*/}
      {/*              .external_cta_link.label,*/}
      {/*          },*/}
      {/*        ]}*/}
      {/*      />*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
    </>
  )
}
