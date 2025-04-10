import { CTA } from "@/lib/cta"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import Text from "@/components/text"
import SectionCardWide from "@/components/sections/section-card-wide"
import Title from "@/components/title"
import LinkButton from "@/components/link-button"

type FeatureCard = {
  title: string
  intro: string
  cta?: CTA
  image?: {
    url?: string
    alternativeText?: string | null
  }
}

type Props = {
  title: string
  description: string
  features: FeatureCard[]
}
export default function FeatureCards({ section }: { section: Props }) {
  return (
    <Container background="stone" padding="both-padding">
      <SectionGroup title={section.title} data-testid="project-cards">
        <Text
          markdown={section.description}
          className="text-center max-w-4xl mx-auto"
        />
        {section.features.map((item, i: number) => {
          return (
            <SectionCardWide
              ctas={[]}
              image={{ src: item.image?.url || "", alt: "" }}
              reverse={i % 2 === 1}
              key={`project_cards${i}`}
            >
              <Title level={3} boldness={"semibold"}>
                {item.title}
              </Title>
              <Text markdown={item.intro} />
              {item.cta && (
                <LinkButton
                  href={`${item.cta.href}`}
                  variant={item.cta.variant}
                  size={item.cta.size}
                >
                  {item.cta.label}
                </LinkButton>
              )}
            </SectionCardWide>
          )
        })}
      </SectionGroup>
    </Container>
  )
}
