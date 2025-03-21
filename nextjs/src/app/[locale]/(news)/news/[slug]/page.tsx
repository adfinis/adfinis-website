import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"

export default async function NewsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const url = `news-pages/xwdeo28mwb53lzvhw8vleaus?populate=categories&populate=sections&populate=hero.background_image&populate=hero.color&populate=localizations`
  const data = await strapi(url)
  const { hero } = data

  const currentLocale = {
    href: `/${locale}/oplossingen`,
    locale: locale,
    isActive: true,
  }

  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(currentLocale)

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      Dingen
    </>
  )
}
