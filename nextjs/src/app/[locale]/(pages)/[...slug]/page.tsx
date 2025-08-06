import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { normalizeLocale } from "@/lib/normalize-locale"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const url = `pages/${slug}?locale=${locale}&status=published`
  const data = await strapi(url)

  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function LandingPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string[] }
}) {
  const URI_PATH = slug.join("/")
  const activeLocale = {
    href: `/${locale}/${URI_PATH}`,
    locale: locale,
    isActive: true,
  }
  const url = `pages/${slug}?locale=${normalizeLocale(locale)}&status=published`
  const data = await strapi(url)
  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/${item.slug}`,
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
