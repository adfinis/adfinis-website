import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import strapi from "@/lib/strapi"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"
import Intro from "@/components/intro"
import NavBar from "@/components/nav-bar/nav-bar"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import LinkButton from "@/components/link-button"

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
        {hero && (
          <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
            <Title markdown={hero.title} />
            <Text markdown={hero.body} />
            {hero.cta && (
              <LinkButton
                href={hero.cta.href}
                variant={hero.cta.variant}
                size={hero.cta.size}
              >
                {hero.cta.label}
              </LinkButton>
            )}
          </Hero>
        )}
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
