import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import Text from "@/components/text"
import SectionCardWide from "@/components/sections/section-card-wide"
import Title from "@/components/title"
import LinkButton from "@/components/link-button"

type ProjectCard = {
  title: string
  intro: string
  cta: CTA
  image: {
    url: string
    alternativeText: string | null
  }
}

type Props = {
  title: string
  description: string
  projects: ProjectCard[]
}
export default function ProjectsCardSectionWithExternalLink({section}: {
  section: Props
}) {
  return (
    <Container background="stone" padding="both-padding">
      <SectionGroup title={section.title} data-testid="project-cards">
        <Text markdown={section.description} className="text-center" />
        {section.projects.map((item, i: number) => {
          return (
            <SectionCardWide
              ctas={[]}
              image={{ src: item.image.url, alt: "" }}
              reverse={i % 2 === 1}
              key={`project_cards${i}`}
            >
              <Title level={3} boldness={"semibold"}>
                {item.title}
              </Title>
              <Text markdown={item.intro} />
              <LinkButton href={`${item.cta.href}`} variant={item.cta.variant}>
                {item.cta.label}
              </LinkButton>
            </SectionCardWide>
          )
        })}
      </SectionGroup>
    </Container>
  )
}
