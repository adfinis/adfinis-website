import strapi from "@/lib/strapi"
import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import Intro from "@/components/intro"
import Text from "@/components/text"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import CardGroup from "@/components/cards/card-group"
import Container from "@/components/container"
import CardArticle from "@/components/cards/card-article"
import { getDictionary } from "@/lib/get-dictionary"
import { getLocaleDateFormatted, Locale } from "@/lib/locale"

export default async function EventsOverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const url = `events-overview/?locale=${locale}&status=published`
  const data = await strapi(url)
  const activeLocale = {
    href: `/${locale}/events`,
    locale: locale,
    isActive: true,
  }
  const dictionary = await getDictionary(locale as Locale)

  const locales = (data.localizations ?? []).map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale}/events`,
        locale: item.locale,
        isActive: false,
      }
    },
  )

  locales.push(activeLocale)

  const { hero, intro, sections } = data

  const cards = await strapi(
    `event-pages/?locale=${locale}&populate=card_image&populate=hero.background_image`,
  )

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
          id="event-grid-example"
          padding="both-padding"
          background="neutral"
        >
          <CardGroup maxWidth="none">
            {cards.map((event: any) => (
              <CardArticle
                key={event.documentId.slice(-4)}
                title={event.metadata_title}
                subtitle={event.address}
                description={`${formatDate(event.date_event)}`}
                imageUrl={event.hero?.background_image.url}
                logoUrl={event.card_image?.url}
                href={`/${locale}/events/${event.slug}`}
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
