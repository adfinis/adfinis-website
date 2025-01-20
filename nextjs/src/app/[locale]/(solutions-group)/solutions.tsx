import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import Text from "@/components/text"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import Intro from "@/components/intro"
import { NavProvider } from "@/components/nav-bar/nav-context"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { renderSections } from "@/components/dynamic-zone/render-sections"

export default async function Solutions({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `solutions-overview?locale=${activeLocale.locale}`

  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
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
          <Text markdown={intro} className="grid gap-8" />
        </Intro>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}
    </>
  )
}
