import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import Text from "@/components/text"
import ButtonGroup from "@/components/button-group"
import CardGroup from "@/components/cards/card-group"
import CardIcon from "@/components/cards/card-icon"
import SectionWhitepaper from "@/components/sections/section-whitepaper"
import SectionQuote from "@/components/sections/section-quote"
import ExternalScript from "@/components/external-script"
import SectionCardWide from "@/components/sections/section-card-wide"
import CardCounter from "@/components/cards/card-counter"
import Hallmarks from "@/components/stapi/hallmarks"

export function renderSections(section: any, index: number) {
  switch (section.__component) {
    case "sections.two-column-section":
      return (
        <Container
          key={`section_two_column_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionGroup columns={2}>
            <Text markdown={section.left_column} />
            <Text markdown={section.right_column} />
          </SectionGroup>
        </Container>
      )
    case "sections.text-section-with-cta":
      return (
        <Container
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionGroup title={section.body} align={"center"}>
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  href: section.cta.href,
                  size: section.cta.size,
                  variant: section.cta.variant,
                  text: section.cta.label,
                },
              ]}
            />
          </SectionGroup>
        </Container>
      )
    case "sections.icon-card-section-with-relation":
      return (
        <Container
          key={`section_icon_card_${index}`}
          background={section.section_props.background}
          padding={section.section_props.padding}
        >
          <SectionGroup title={section.title}>
            <CardGroup>
              {section.cards.map((item: any, i: number) => {
                return (
                  <CardIcon
                    imageUrl={item.icon_image.url}
                    title={item.title}
                    description={item.description}
                    cta={[item.cta].map(mapCta)[0]}
                    key={`kpi_sections_${i}`}
                  />
                )
              })}
            </CardGroup>
          </SectionGroup>
        </Container>
      )
    case "relations.white-paper-section":
      return (
        <Container
          key={`section_white_paper_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionWhitepaper
            title={section.white_paper.title}
            cta={{
              text: "Download white paper",
              href: section.white_paper.download_file?.url ?? "",
              variant: "cta",
              size: "large",
            }}
            image={{
              src: section.white_paper?.cover_image?.url,
              alt: section.white_paper?.cover_image?.alternativeText ?? "",
            }}
            text={section.white_paper.description}
          />
        </Container>
      )
    case "relations.quotes-relation":
      return (
        <Container
          key={`section_quote_${index}`}
          background={"neutral"}
          padding={"both-padding"}
        >
          <SectionGroup hasDividers>
            {section.quotes.length > 0 && section.quotes[0] && (
              <SectionQuote
                author={`${section.quotes[0].name} | ${section.quotes[0].tagline}`}
                image={section.quotes[0].image}
                quote={section.quotes[0].quote}
              />
            )}
          </SectionGroup>
        </Container>
      )
    case "sections.heading-with-link-container":
      return (
        <Container
          key={`section_heading_with_link_${index}`}
          background={section.background}
          padding={section.padding}
        >
          <SectionGroup
            title={section.section_group_with_external_link.title}
            align={"center"}
          >
            <ButtonGroup
              align={"center"}
              ctas={[
                {
                  href: section.section_group_with_external_link
                    .external_cta_link.href,
                  size: section.section_group_with_external_link
                    .external_cta_link.size,
                  variant:
                    section.section_group_with_external_link.external_cta_link
                      .variant,
                  text: section.section_group_with_external_link
                    .external_cta_link.label,
                },
              ]}
            />
          </SectionGroup>
        </Container>
      )
    case "sections.video-section":
      return (
        <Container
          key={`section_video-section_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionGroup title={section.section_title}>
            <ExternalScript
              html={section.embed_html}
              className="w-full h-auto"
            />
          </SectionGroup>
        </Container>
      )
    case "sections.video-with-text-section":
      return (
        <Container
          key={`section_video-section_${index}`}
          background={section.props.background}
          padding={section.props.padding}
        >
          <SectionGroup title={section.section_title}>
            <SectionCardWide
              childrenWide={
                <ExternalScript
                  html={section.embed_html}
                  className="w-full h-auto"
                />
              }
            >
              <Text markdown={section.body} />
            </SectionCardWide>
          </SectionGroup>
        </Container>
      )
    case "sections.kpi-with-intro-and-hallmarks-section":
      return (
        <Container background="neutral" padding="both-padding">
          <SectionGroup
            align="center"
            title={section.title}
            text={section.description}
          >
            <CardGroup>
              {section.kpis.map((item: any, i: number) => (
                <CardCounter
                  key={i}
                  title={item.title}
                  imageUrl={item.icon_image.url}
                  description={item.description}
                />
              ))}
            </CardGroup>
            <Hallmarks hallmarksId={section.hallmark.documentId} />
          </SectionGroup>
        </Container>
      )
    default:
      return <p key={`section_${index}`}>Unknown section</p>
  }
}

const mapCta = (cta: any) => {
  if (!cta) return undefined
  return {
    text: cta.label,
    ...cta,
  }
}
