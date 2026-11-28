import { getNewsGrid, TagFilter as TagFilterValue } from "@/lib/strapi"
import { NEWS_SLUGS } from "@/lib/slugs"
import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"
import { getLocaleDateFormatted, Locale } from "@/lib/locale"
import Pagination from "../pagination/pagination"
import TagFilter from "@/components/tag-filter"
import { cardLabels, hasTagFilter } from "@/lib/tag-filter"
import { getDictionary } from "@/lib/get-dictionary.server"

export default async function NewsOverviewGridSection({
  page,
  locale,
  filter,
}: {
  /**
   * page comes from searchParams.
   */
  page?: string | string[]
  locale: Locale
  filter?: TagFilterValue
}) {
  const index = Array.isArray(page) ? Number(page[0]) : Number(page) || 1
  const pageSize = 24
  const [{ data, meta }, dictionary] = await Promise.all([
    getNewsGrid(locale, { page: index, pageSize, filter }),
    getDictionary(locale),
  ])
  const overview = {
    text: dictionary.cardLabels.news,
    href: `/${locale}/${NEWS_SLUGS[locale.toLowerCase() as Locale]}`,
  }
  const cards = data.map((item: any) => {
    return {
      key: `news_item_${item.id}`,
      title: item.card_title,
      subtitle: item.card_subtitle,
      description: `${getLocaleDateFormatted({
        date: item.publication_date ?? item.publishedAt,
        locale: locale,
      })} / ${item.minutes_read} min read`,
      imageUrl: item.hero?.background_image?.url,
      categories: cardLabels(overview, item.tags),
      href: `${overview.href}/${item.slug}`,
    }
  })

  return (
    <>
      <TagFilter locale={locale} filter={filter} dateRange />
      <Container padding="both-padding" background="white">
        {hasTagFilter(filter) && meta.pagination.total === 0 && (
          <p data-testid="no-results">{dictionary.filters.noResults}</p>
        )}
        <CardGroup maxWidth="none" testId="card-grid">
          {cards.map((card: any) => (
            <CardArticle {...card} key={card.key} />
          ))}
        </CardGroup>
        <Pagination
          pageCount={meta.pagination.pageCount}
          total={meta.pagination.total}
          pageSize={meta.pagination.pageSize}
          page={index}
          locale={locale}
          filter={filter}
        />
      </Container>
    </>
  )
}
