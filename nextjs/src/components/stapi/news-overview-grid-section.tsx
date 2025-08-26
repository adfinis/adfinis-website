import { getNewsGrid } from "@/lib/strapi"
import { NEWS_SLUGS } from "@/lib/slugs"
import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"
import { getLocaleDateFormatted, Locale } from "@/lib/locale"

export default async function NewsOverviewGridSection({
  locale,
}: {
  locale: Locale
}) {
  const data = await getNewsGrid(locale)
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
      categories: item.categories?.map((cat: any) => {
        return {
          text: cat.name,
          href: cat.url,
        }
      }),
      href: `/${locale}/${NEWS_SLUGS[locale]}/${item.slug}`,
    }
  })
  return (
    <Container padding="both-padding" background="white">
      <CardGroup maxWidth="none">
        {cards.map((card: any) => (
          <CardArticle {...card} key={card.key} />
        ))}
      </CardGroup>
    </Container>
  )
}
