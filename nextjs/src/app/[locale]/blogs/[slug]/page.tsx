import { getLocaleDateFormatted, Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getBlogPage } from "@/lib/strapi"
import { BLOG_SLUGS } from "@/lib/slugs"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import InfoLabel from "@/components/info-label"
import TextImage from "@/components/text-image"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getBlogPage(locale, slug)

  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function BlogPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
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
              text={`Published at ${getLocaleDateFormatted({ date: publishedAt ?? createdAt, locale: activeLocale.locale as Locale })}`}
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
