import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { getSolutionPage } from "@/lib/strapi"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { Locale } from "@/lib/locale"

export default async function SolutionDetail({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const data = await getSolutionPage(activeLocale.locale, slug)
  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      const locale = item.locale.toLowerCase() as Locale
      return {
        href: `/${locale}/${SOLUTIONS_SLUGS[locale]}/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
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
