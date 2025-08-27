import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import InfoLabel from "@/components/info-label"
import TextImage from "@/components/text-image"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { getNewsPage } from "@/lib/strapi"
import { Locale, getLocaleDateFormatted } from "@/lib/locale"
import { NEWS_SLUGS } from "@/lib/slugs"

export default async function NewsDetail({
  activeLocale,
  slug,
}: {
  activeLocale: LinkedLocale
  slug: string
}) {
  const data = await getNewsPage(activeLocale.locale, slug)
  const {
    hero,
    main_blog,
    sections,
    publication_date,
    publishedAt,
    createdAt,
  } = data
  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/${NEWS_SLUGS[item.locale.toLowerCase() as Locale]}/${item.slug}`,
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
              text={`Published at ${getLocaleDateFormatted({ date: publication_date ?? publishedAt ?? createdAt, locale: activeLocale.locale as Locale })}`}
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
