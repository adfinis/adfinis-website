import type { ComponentProps } from "react"
import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import CardArticle from "@/components/cards/card-article"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import { CTA } from "@/lib/cta"
import {
  getLocaleDateFormatted,
  getLocaleDateRangeFormatted,
  Locale,
} from "@/lib/locale"
import { CASE_STUDIES_SLUGS, NEWS_SLUGS } from "@/lib/slugs"
import {
  getCaseStudiesGrid,
  getEventPageCards,
  getNewsGrid,
  getTags,
  type Tag,
  type TagFilter,
} from "@/lib/strapi"

type Props = {
  props: SectionProps
  title: string
  description: string
  cta?: CTA
  resource: "all" | "news" | "events" | "success-stories"
  tags?: Tag[]
  limit?: number
}

type Card = ComponentProps<typeof CardArticle> & { id: string; addedAt: string }

function tagsToFilter(tags: Tag[]) {
  const filter: TagFilter = {}
  for (const { group, slug } of tags) {
    filter[group] = [...(filter[group] ?? []), slug]
  }
  return filter
}

export default async function FilteredCarousel({
  section,
  locale,
}: {
  section: Props
  locale: Locale
}) {
  const { resource } = section
  const limit = Math.min(Math.max(section.limit ?? 5, 1), 12)
  const tags = section.tags ?? []
  const eventsOnly = resource === "events"

  if (tags.length > 0) {
    const known = await getTags(locale)
    const anyKnown = tags.some(({ group, slug }) =>
      known.some((tag) => tag.group === group && tag.slug === slug),
    )
    if (!anyKnown) {
      return null
    }
  }

  const filter = tagsToFilter(tags)
  const withNews = resource === "all" || resource === "news"
  const withCaseStudies = resource === "all" || resource === "success-stories"
  const datedAndUndated = [true, false]

  const [news, events, caseStudies] = await Promise.all([
    withNews
      ? Promise.all(
          datedAndUndated.map((dated) =>
            getNewsGrid(locale, { page: 1, pageSize: limit, filter, dated }),
          ),
        ).then((lists) => lists.flatMap(({ data }) => data))
      : [],
    resource === "all" || eventsOnly
      ? getEventPageCards(locale, filter, {
          sort: eventsOnly ? "date_event:asc" : "createdAt:desc",
          pageSize: limit,
        })
      : [],
    withCaseStudies
      ? Promise.all(
          datedAndUndated.map((dated) =>
            getCaseStudiesGrid(locale, filter, { pageSize: limit, dated }),
          ),
        ).then((lists) => lists.flat())
      : [],
  ])

  const eventCards: Card[] = events.map((item: any) => ({
    id: `event_${item.documentId}`,
    addedAt: item.createdAt,
    title: item.metadata_title,
    subtitle: item.address,
    description: getLocaleDateRangeFormatted({
      startDate: item.date_event,
      endDate: item.date_event_end,
      locale,
    }),
    imageUrl: item.hero?.background_image?.url,
    logoUrl: item.card_image?.url,
    href: `/${locale}/events/${item.slug}`,
  }))

  const cards: Card[] = eventsOnly
    ? eventCards
    : [
        news.map((item: any) => ({
          id: `news_${item.documentId}`,
          addedAt: item.publication_date ?? item.publishedAt,
          title: item.card_title,
          subtitle: item.card_subtitle,
          description: `${getLocaleDateFormatted({
            date: item.publication_date ?? item.publishedAt,
            locale,
          })} / ${item.minutes_read} min read`,
          imageUrl: item.hero?.background_image?.url,
          categories: item.categories?.map((category: any) => ({
            text: category.name,
            href: category.url,
          })),
          href: `/${locale}/${NEWS_SLUGS[locale]}/${item.slug}`,
        })),
        eventCards,
        caseStudies.map((item: any) => ({
          id: `case_study_${item.documentId}`,
          addedAt: item.publication_date ?? item.publishedAt,
          title: item.card_title,
          subtitle: item.card_subtitle,
          description: "",
          imageUrl: item.hero?.background_image?.url,
          logoUrl: item.client_image?.url,
          href: `/${locale}/${CASE_STUDIES_SLUGS[locale]}/${item.slug}`,
        })),
      ]
        .flat()
        .sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt))
        .slice(0, limit)

  if (cards.length === 0) {
    return null
  }

  return (
    <Container
      id={section.props.anchor}
      padding={section.props.padding}
      background={section.props.background}
    >
      <CardSlider
        title={section.title}
        description={section.description}
        ctas={section.cta ? [section.cta] : []}
      >
        {cards.map((card) => (
          <CardSliderElement key={card.id}>
            <CardArticle {...card} />
          </CardSliderElement>
        ))}
      </CardSlider>
    </Container>
  )
}
