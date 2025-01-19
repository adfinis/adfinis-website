import TwoColumnSection from "@/components/dynamic-zone/wrapper/sections/two-column-section"
import TextSectionWithCta from "@/components/dynamic-zone/wrapper/sections/text-section-with-cta"
import IconCardSectionWithRelation from "@/components/dynamic-zone/wrapper/sections/icon-card-section-with-relation"
import WhitePaperSection from "@/components/dynamic-zone/wrapper/relations/white-paper-section"
import QuotesRelation from "@/components/dynamic-zone/wrapper/relations/quotes-relation"
import VideoSection from "@/components/dynamic-zone/wrapper/sections/video-section"
import VideoWithTextSection from "@/components/dynamic-zone/wrapper/sections/video-with-text-section"
import KpiWithIntroAndHallmarksSection from "@/components/dynamic-zone/wrapper/sections/kpi-with-intro-and-hallmarks-section"
import ProjectsCardSectionWithExternalLink from "@/components/dynamic-zone/wrapper/sections/projects-card-section-with-external-link"
import EventsSectionWithIntroAndCta from "@/components/dynamic-zone/wrapper/sections/events-section-with-intro-and-cta"

export function renderSections(section: any, index: number) {
  switch (section.__component) {
    case "sections.two-column-section":
      return (
        <TwoColumnSection
          key={`section_two_column_${index}`}
          section={section}
        />
      )
    case "sections.text-section-with-cta":
      return (
        <TextSectionWithCta
          key={`section_text_section_with_cta_${index}`}
          section={section}
        />
      )
    case "sections.icon-card-section-with-relation":
      return (
        <IconCardSectionWithRelation
          key={`section_icon_card_section_with_relation_${index}`}
          section={section}
        />
      )
    case "relations.white-paper-section":
      return (
        <WhitePaperSection
          key={`section_white_paper_${index}`}
          section={section}
        />
      )
    case "relations.quotes-relation":
      return <QuotesRelation key={`section_quote_${index}`} section={section} />
    case "sections.video-section":
      return (
        <VideoSection
          key={`section_video_section_${index}`}
          section={section}
        />
      )
    case "sections.video-with-text-section":
      return (
        <VideoWithTextSection
          key={`section_video-section_${index}`}
          section={section}
        />
      )
    case "sections.kpi-with-intro-and-hallmarks-section":
      return (
        <KpiWithIntroAndHallmarksSection
          key={`section_kpi_with_intro_and_hallmarks_section_${index}`}
          section={section}
        />
      )
    case "sections.projects-card-section-with-external-link":
      return (
        <ProjectsCardSectionWithExternalLink
          key={`section_projects_card_section_with_external_link_${index}`}
          section={section}
        />
      )
    case "sections.events-section-with-intro-and-cta":
      return (
        <EventsSectionWithIntroAndCta
          key={`section_events-section-with-intro-and-cta_${index}`}
          section={section}
        />
      )
    default:
      return <p key={`section_${index}`}>Unknown section</p>
  }
}
