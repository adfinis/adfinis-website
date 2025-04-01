import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import InfoLabel from "@/components/info-label"
import TextImage from "@/components/text-image"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import { NEWS_SLUGS } from "@/app/[locale]/(news)/news-slugs"

export default async function NewsDetail({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const url = `news-pages/${slug}?locale=${activeLocale.locale}&status=published`
  const data = await strapi(url)
  const { hero, main_blog, sections, publishedAt, createdAt } = data
  const locales = data.localizations.map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/${NEWS_SLUGS[item.locale]}/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
  locales.push(activeLocale)

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      <section className={"px-4 lg:px-0 relative bg-white"}>
        <div className="container sm:px-2">
          <div className="mx-auto pb-8 max-w-4xl">
            <InfoLabel
              text={`Published at ${publishedAt ?? createdAt}`}
              className="block mb-4"
            />
            <TextImage markdown={main_blog} />
          </div>
        </div>
      </section>
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}
      <Footer locale={activeLocale.locale} />
    </>
  )
}
