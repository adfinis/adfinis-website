import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"

export default async function LandingPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string[] }
}) {
  const URI_PATH = slug.join("/")
  const currentLocale = {
    href: `/${locale}/${URI_PATH}`,
    locale: locale,
    isActive: true,
  }
  const url = `pages/${slug}`
  const data = await strapi(url)
  const locales = data.localizations.map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
  locales.push(currentLocale)

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
      <Footer locale={currentLocale.locale} />
    </>
  )
}
