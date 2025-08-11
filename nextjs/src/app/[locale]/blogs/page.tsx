import { getBlogOverviewCards, getBlogsOverview } from "@/lib/strapi"
import { getLocaleDateFormatted, Locale } from "@/lib/locale"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import Container from "@/components/container"
import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
  }
}) {
  const data = await getBlogsOverview(locale)
  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const data = await getBlogsOverview(locale)
  const cards = await getBlogOverviewCards(locale)
  const activeLocale = {
    href: `/${locale}/blog`,
    locale: locale,
    isActive: true,
  }
  const locales = (data.localizations ?? []).map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/blogs`,
        locale: item.locale,
        isActive: false,
      }
    },
  )
  locales.push(activeLocale)
  const { hero, intro, sections } = data
  function formatDate(date: string) {
    return getLocaleDateFormatted({ date, locale: locale as Locale })
  }

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
      {cards.length > 0 && (
        <Container
          id="blog-cards-grid"
          padding="both-padding"
          background="neutral"
        >
          <CardGroup maxWidth="none">
            {cards.map((item: any) => (
              <CardArticle
                key={item.documentId.slice(-4)}
                title={item.metadata_title}
                description={`${formatDate(item.publishedAt)}`}
                imageUrl={item.hero?.background_image.url}
                href={`/${locale.toLocaleLowerCase()}/blogs/${item.slug}`}
              />
            ))}
          </CardGroup>
        </Container>
      )}
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, locale),
        )}
      <Footer locale={locale} />
    </>
  )
}
