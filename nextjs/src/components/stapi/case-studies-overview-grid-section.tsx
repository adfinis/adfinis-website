import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"
import { SLUGS } from "@/app/[locale]/(case-studies)/case-studies-slugs"
import strapi from "@/lib/strapi"

export default async function CaseStudiesOverviewGridSection({
  locale,
}: {
  locale: string
}) {
  const url = `page-case-studies?locale=${locale}&populate=hero.background_image&populate=client_image`
  const data = await strapi(url)
  const cards = data.map((item) => {
    return {
      key: `case_study_${item.id}`,
      title: item.card_title,
      subtitle: item.card_subtitle,
      description: "",
      imageUrl: item.hero?.background_image?.url,
      logoUrl: item.client_image?.url,
      href: `/${locale}/${SLUGS[locale]}/${item.slug}`,
    }
  })
  return (
    <Container padding="both-padding" background="neutral">
      <CardGroup maxWidth="none">
        {cards.map((card, index) => (
          <CardArticle {...card} key={card.key} />
        ))}
      </CardGroup>
    </Container>
  )
}
