import { getPage } from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string[]
  }
}): Promise<Metadata> {
  const path = slug.join("/")
  const data = await getPage(locale, path)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase()
      acc[item.locale] = `${ABSOLUTE_URL}/${slugLocale}/${item.slug}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/${slug}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/${path}`,
      languages,
    },
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
  const data = await getPage(locale, URI_PATH)
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
