import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import { getPartnerAndProductsPage } from "@/lib/strapi"
import Text from "@/components/text"
import Intro from "@/components/intro"
import NavBar from "@/components/nav-bar/nav-bar"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { notFound } from "next/navigation"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Footer from "@/components/stapi/footer"
import { Locale } from "@/lib/locale"

export default async function PartnersProducts({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const data = await getPartnerAndProductsPage(activeLocale.locale, slug)

  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/${PARTNER_PRODUCTS_SLUGS[item.locale.toLowerCase() as Locale]}/${item.slug}`,
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
