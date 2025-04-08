import strapi from "@/lib/strapi"
import { NEWS_SLUGS } from "@/app/[locale]/(news)/news-slugs"
import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"

export default async function NewsOverviewGridSection({
  locale,
}: {
  locale: string
}) {
  const url = `news-pages?locale=${locale}&populate=hero.background_image&populate=categories&status=published`
  const data = await strapi(url)
  const cards = data.map((item: any) => {
    return {
      key: `news_item_${item.id}`,
      title: item.card_title,
      subtitle: item.card_subtitle,
      description: `${item.publishedAt} / ${item.minutes_read} min read`,
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
