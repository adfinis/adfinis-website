import Text from "@/components/text"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionCardWide from "@/components/sections/section-card-wide"
import LinkButton from "@/components/link-button"
import Title from "@/components/title"

const SUB_PAGE: any = {
  en: "solutions",
  nl: "oplossingen",
  de: "lösungen",
}

const READ_MORE: any = {
  en: "Read more",
  nl: "Lees meer",
  de: "Mehr lesen",
}

type SolutionCard = {
  title: string
  description: string
  image: {
    url: string
    alternativeText: string | null
  }
  solution_page: {
    locale: string
    slug: string
  }
}

type Props = {
  props: SectionProps
  title: string
  solutions: SolutionCard[]
}
export default function SectionSolutionsRelation({
  section,
}: {
  section: Props
}) {
  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <SectionGroup title={section.title}>
        {section.solutions.map((item, i: number) => {
          return (
            <SectionCardWide
              ctas={[]}
              image={{
                src: item.image.url,
                alt: item.image.alternativeText ?? "",
              }}
              reverse={i % 2 === 1}
              key={`solutions_section_solutions_${i}`}
            >
              <Title level={3} boldness={"semibold"}>
                {item.title}
              </Title>
              <Text markdown={item.description} />
              <LinkButton
                href={`/${item.solution_page.locale}/${SUB_PAGE[item.solution_page.locale]}/${item.solution_page.slug}`}
              >
                {READ_MORE[item.solution_page.locale]}
              </LinkButton>
            </SectionCardWide>
          )
        })}
      </SectionGroup>
    </Container>
  )
}
