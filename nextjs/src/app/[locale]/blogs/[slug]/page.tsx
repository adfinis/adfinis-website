import { getLocaleDateFormatted, Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getBlogPage } from "@/lib/strapi"
import { BLOG_SLUGS } from "@/lib/slugs"
import { buildMetadata } from "@/lib/metadata"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import InfoLabel from "@/components/info-label"
import TextImage from "@/components/text-image"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { getDictionary } from "@/lib/get-dictionary.server"

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}): Promise<Metadata> {
  const params = await props.params

  const { locale, slug } = params

  const data = await getBlogPage(locale, slug)

  return buildMetadata({
    data,
    locale,
    path: `${BLOG_SLUGS[locale]}/${slug}`,
    type: "article",
  })
}

export default async function BlogPage(props: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const params = await props.params

  const { locale, slug } = params

  const activeLocale = {
    href: `/${locale.toLowerCase()}/${BLOG_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  const data = await getBlogPage(activeLocale.locale, slug)
  const { hero, main_blog, sections, publishedAt, createdAt } = data
  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/${BLOG_SLUGS[item.locale.toLowerCase() as Locale]}/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
  locales.push(activeLocale)
  const dictionary = await getDictionary(activeLocale.locale as Locale)

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
              text={`${dictionary.common.publishedAt} ${getLocaleDateFormatted({ date: publishedAt ?? createdAt, locale: activeLocale.locale as Locale })}`}
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
