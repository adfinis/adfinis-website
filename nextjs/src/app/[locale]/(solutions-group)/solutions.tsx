import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import Text from "@/components/text"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import Intro from "@/components/intro"
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { renderSections } from "@/components/dynamic-zone/render-sections"

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
  const url = `solutions-overview?locale=${activeLocale.locale}`

  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(activeLocale)

  const { hero, intro, sections } = data

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
      {/*{sla_section && (*/}
      {/*  <Container*/}
      {/*    background={sla_section.section_props.background}*/}
      {/*    padding={sla_section.section_props.padding}*/}
      {/*  >*/}
      {/*    <SectionGroup title={sla_section.title}>*/}
      {/*      <CardGroup hasDividers>*/}
      {/*        {sla_section.sla_cards.map((item: any, i: number) => {*/}
      {/*          return (*/}
      {/*            <CardService*/}
      {/*              usps={item.items.map((sla: any) => {*/}
      {/*                return {*/}
      {/*                  text: sla.name,*/}
      {/*                  active: !sla.is_disabled,*/}
      {/*                }*/}
      {/*              })}*/}
      {/*              title={item.name}*/}
      {/*              description=""*/}
      {/*              key={`sla_${i}`}*/}
      {/*            />*/}
      {/*          )*/}
      {/*        })}*/}
      {/*      </CardGroup>*/}
      {/*    </SectionGroup>*/}
      {/*  </Container>*/}
      {/*)}*/}
    </>
  )
}
