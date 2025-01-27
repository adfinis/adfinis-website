import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"

export default async function EventsOverviewPage({ params: { locale } }) {
  const url = `events-overview/?locale=${locale}&populate=hero.color&populate=hero.background_image`
  const data = await strapi(url)
  const currentLocale = {
    href: `/${locale}/events`,
    locale: locale,
    isActive: true,
  }

  const locales = (data.localizations ?? []).map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/events`,
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
          <Text markdown={intro} className="grid gap-8" />
        </Intro>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}
      <Footer locale={locale} />
    </>
  )
}
