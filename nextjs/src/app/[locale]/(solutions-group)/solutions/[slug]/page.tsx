import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import strapi from "@/lib/strapi"
import Text from "@/components/text"
import Intro from "@/components/intro"
import NavBar from "@/components/nav-bar/nav-bar"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Footer from "@/components/stapi/footer"

const SUB_PAGE = {
  en: "solutions",
  nl: "oplossingen",
  de: "lösungen",
}

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const currentLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }
  const url = `solutions-pages/${slug}`
  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
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
      <Footer locale={currentLocale.locale} />
    </>
  )
}
