import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"

export default async function Solutions({
  activeLocale,
}: {
  activeLocale: LinkedLocale
}) {
  const url = `solutions-overview?locale=${activeLocale.locale}&populate=localizations&populate=hero.backround_image&populate=hero.color`
  const { data } = await (await strapi(url)).json()
  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(activeLocale)

  const { hero } = data

  return (
    <>
      <NavBar items={locales} />
      {hero && (
        <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
          <Title markdown={hero.title} />
          <Text markdown={hero.body} />
        </Hero>
      )}
    </>
  )
}
