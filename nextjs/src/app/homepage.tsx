import NavBar from "@/components/nav-bar/nav-bar"
import Text from "@/components/text"
import Intro from "@/components/intro"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"

export default async function Homepage({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `homepage?locale=${activeLocale.locale}`
  const data = await strapi(url)
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
      <Footer locale={activeLocale.locale} />
    </>
  )
}
