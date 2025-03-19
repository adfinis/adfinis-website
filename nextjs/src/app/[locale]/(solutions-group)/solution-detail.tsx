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

export default async function SolutionDetail({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const url = `solutions-pages/${slug}?locale=${activeLocale.locale}`
  const data = await strapi(url)
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
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      {intro && (
        <Intro>
          <Text markdown={intro} />
        </Intro>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}
      <Footer locale={activeLocale.locale} />
    </>
  )
}
