import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { SLUGS } from "@/app/[locale]/(case-studies)/case-studies-slugs"
import CaseStudiesOverviewGridSection from "@/components/stapi/case-studies-overview-grid-section"

export default async function CaseStudiesOverviewPage({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `case-studies-overview?locale=${activeLocale.locale}`
  const data = await strapi(url)
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
          <Text markdown={intro} />
        </Intro>
      )}
      <CaseStudiesOverviewGridSection locale={activeLocale.locale} />
      {sections && sections.length > 0 && sections.map(renderSections)}
      <Footer locale={activeLocale.locale} />
    </>
  )
}
