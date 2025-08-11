import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { getSolutionsOverview } from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import Text from "@/components/text"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import Intro from "@/components/intro"
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { Locale } from "@/lib/locale"

export default async function Solutions({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const data = await getSolutionsOverview(activeLocale.locale)
  const locales = data.localizations.map((item: { locale: Locale }) => {
    const locale = item.locale.toLowerCase() as Locale
    return {
      href: `/${locale}/${SOLUTIONS_SLUGS[locale]}`,
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
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}

      <Footer locale={activeLocale.locale} />
    </>
  )
}
