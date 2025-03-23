import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import strapi from "@/lib/strapi"
import Text from "@/components/text"
import Intro from "@/components/intro"
import NavBar from "@/components/nav-bar/nav-bar"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { notFound } from "next/navigation"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Footer from "@/components/stapi/footer"

export default async function PartnersProducts({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const url = `page-partner-and-products/${slug}?locale=${activeLocale.locale}&status=published`
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
