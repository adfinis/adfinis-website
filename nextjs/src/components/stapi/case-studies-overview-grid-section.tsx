import CardGroup from "@/components/cards/card-group"
import CardArticle from "@/components/cards/card-article"
import Container from "@/components/container"
import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { getCaseStudiesGrid } from "@/lib/strapi"
import { Locale } from "@/lib/locale"

export default async function CaseStudiesOverviewGridSection({
  locale,
}: {
  locale: Locale
}) {
  const data = await getCaseStudiesGrid(locale)
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
      <CardGroup maxWidth="none">
        {cards.map((card: any) => (
          <CardArticle {...card} key={card.key} />
        ))}
      </CardGroup>
    </Container>
  )
}
