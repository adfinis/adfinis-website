import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"
import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { getCaseStudiesGrid, TagFilter as TagFilterValue } from "@/lib/strapi"
import TagFilter from "@/components/tag-filter"
import { hasTagFilter } from "@/lib/tag-filter"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

export default async function CaseStudiesOverviewGridSection({
  locale,
  filter,
}: {
  locale: Locale
  filter?: TagFilterValue
}) {
  const [data, dictionary] = await Promise.all([
    getCaseStudiesGrid(locale, filter),
    getDictionary(locale),
  ])
  const cards = data.map((item: any) => {
    return {
      key: `case_study_${item.id}`,
      title: item.card_title,
      subtitle: item.card_subtitle,
      description: "",
      imageUrl: item.hero?.background_image?.url,
      logoUrl: item.client_image?.url,
      href: `/${locale}/${CASE_STUDIES_SLUGS[locale.toLowerCase() as Locale]}/${item.slug}`,
    }
  })
  return (
    <Container padding="both-padding" background="neutral">
      <TagFilter locale={locale} filter={filter} />
      {hasTagFilter(filter) && cards.length === 0 && (
        <p data-testid="no-results">{dictionary.filters.noResults}</p>
      )}
      <CardGroup maxWidth="none" testId="card-grid">
        {cards.map((card: any) => (
          <CardArticle {...card} key={card.key} />
        ))}
      </CardGroup>
    </Container>
  )
}
