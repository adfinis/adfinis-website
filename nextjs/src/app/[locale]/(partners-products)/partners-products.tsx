import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import strapi from "@/lib/strapi"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import NavBar from "@/components/nav-bar/nav-bar"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { notFound } from "next/navigation"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { renderSections } from "@/components/dynamic-zone/render-sections"

export default async function PartnersProducts({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const url = `page-partner-and-products/${slug}?locale=${activeLocale.locale}`
  const page = await strapi(url)
  if (page && page.status === 404) {
    return notFound()
  }

  const { data } = await page.json()

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
        {hero && (
          <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
            <Title markdown={hero.title} />
            <Text markdown={hero.body} />
          </Hero>
        )}
      </NavProvider>
      {intro && (
        <Intro>
          <Text markdown={intro.body} className="grid gap-8" />
        </Intro>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}
    </>
  )
}
