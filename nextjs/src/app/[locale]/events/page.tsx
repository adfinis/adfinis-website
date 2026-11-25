import {
  getEventPageCards,
  getEventsOverview,
  getPastEventPageCards,
} from "@/lib/strapi"
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
import { getLocaleDateRangeFormatted, Locale } from "@/lib/locale"
import { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import { getDictionary } from "@/lib/get-dictionary.server"
import Title from "@/components/title"
import TagFilter from "@/components/tag-filter"
import { hasTagFilter, parseTagFilter } from "@/lib/tag-filter"

export async function generateMetadata(props: {
  params: Promise<{
    locale: string
    slug: string
  }>
}): Promise<Metadata> {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale } = params

  const data = await getEventsOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase()
      acc[item.locale] = `${ABSOLUTE_URL}/${slugLocale}/events`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/events` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({
    data,
    locale,
    path: "events",
    languages,
  })
}

export default async function EventsOverviewPage(props: {
  params: Promise<{ locale: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filter = parseTagFilter(await props.searchParams)
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale } = params

  const data = await getEventsOverview(locale)
  const activeLocale = {
    href: `/${locale}/events`,
    locale: locale,
    isActive: true,
  }

  const locales = (data.localizations ?? []).map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/events`,
        locale: item.locale,
        isActive: false,
      }
    },
  )

  locales.push(activeLocale)

  const { hero, intro, sections } = data
  const [cards, pastCards, dictionary] = await Promise.all([
    getEventPageCards(locale, filter),
    getPastEventPageCards(locale),
    getDictionary(locale),
  ])

  function renderCard(event: any) {
    return (
      <CardArticle
        key={event.documentId.slice(-4)}
        title={event.metadata_title}
        subtitle={event.address}
        description={getLocaleDateRangeFormatted({
          startDate: event.date_event,
          endDate: event.date_event_end,
          locale,
        })}
        imageUrl={event.hero?.background_image.url}
        logoUrl={event.card_image?.url}
        href={`/${locale.toLocaleLowerCase()}/events/${event.slug}`}
      />
    )
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
      {(cards.length > 0 || hasTagFilter(filter)) && (
        <Container
          id="event-grid-example"
          padding="both-padding"
          background="neutral"
        >
          <TagFilter locale={locale} filter={filter} />
          {cards.length === 0 && <p>{dictionary.filters.noResults}</p>}
          <CardGroup maxWidth="none">{cards.map(renderCard)}</CardGroup>
        </Container>
      )}
      {pastCards.length > 0 && (
        <Container id="past-events" padding="both-padding" background="white">
          <Title className="mb-12">{dictionary.pages.events.pastEvents}</Title>
          <CardGroup maxWidth="none">{pastCards.map(renderCard)}</CardGroup>
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
