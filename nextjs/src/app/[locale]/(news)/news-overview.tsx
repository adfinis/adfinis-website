import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import NewsOverviewGridSection from "@/components/stapi/news-overview-grid-section"

export default async function NewsOverview({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `news-overview?locale=${activeLocale.locale}&status=published`
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
      <NewsOverviewGridSection locale={activeLocale.locale} />
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}

      <Footer locale={activeLocale.locale} />
    </>
  )
}
