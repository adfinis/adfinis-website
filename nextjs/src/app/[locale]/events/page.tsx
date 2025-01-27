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

export default async function EventsOverviewPage({ params: { locale } }) {
  const url = `events-overview/?locale=${locale}`
  const data = await strapi(url)
  const currentLocale = {
    href: `/${locale}/events`,
    locale: locale,
    isActive: true,
  }

  const locales = (data.localizations ?? []).map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/events`,
        locale: item.locale,
        isActive: false,
      }
    },
  )

  locales.push(currentLocale)

  const { hero, intro, sections } = data

  const cards = await strapi(
    `event-pages/?locale=${locale}&populate=card_image&populate=hero.background_image`,
  )

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
      {cards.length > 0 && (
        <Container
          id="event-grid-example"
          padding="both-padding"
          background="neutral"
        >
          <CardGroup maxWidth="none">
            {cards.map((event, index) => (
              <CardArticle
                key={event.documentId.slice(-4)}
                title={event.metadata_title}
                subtitle={event.address}
                description={event.date_event}
                imageUrl={event.hero?.background_image.url}
                logoUrl={event.card_image?.url}
              />
            ))}
          </CardGroup>
        </Container>
      )}
      {sections && sections.length > 0 && sections.map(renderSections)}
      <Footer locale={locale} />
    </>
  )
}
