import TwoColumnSection from "@/components/dynamic-zone/wrapper/sections/two-column-section"
import TextSectionWithCta from "@/components/dynamic-zone/wrapper/sections/text-section-with-cta"
import IconCardSectionWithRelation from "@/components/dynamic-zone/wrapper/sections/icon-card-section-with-relation"
import WhitePaperSection from "@/components/dynamic-zone/wrapper/relations/white-paper-section"
import QuoteSection from "@/components/dynamic-zone/wrapper/sections/quote-section"
import VideoSection from "@/components/dynamic-zone/wrapper/sections/video-section"
import VideoWithTextSection from "@/components/dynamic-zone/wrapper/sections/video-with-text-section"
import KpiWithIntroAndHallmarksSection from "@/components/dynamic-zone/wrapper/sections/kpi-with-intro-and-hallmarks-section"
import FeatureCards from "@/components/dynamic-zone/wrapper/sections/feature-cards"
import ServicesSection from "@/components/dynamic-zone/wrapper/sections/services-section"
import SectionSolutionsRelation from "@/components/dynamic-zone/wrapper/relations/section-solutions-relation"
import SlaCardSection from "@/components/dynamic-zone/wrapper/relations/sla-card-section"
import ColorCardSliderSection from "@/components/dynamic-zone/wrapper/sections/color-card-slider-section"
import ProductFeatureCard from "@/components/dynamic-zone/wrapper/relations/product-feature-card"
import InfoDetailsSection from "@/components/dynamic-zone/wrapper/sections/info-details-section"
import ExtraWideIconCardsGridSection from "@/components/dynamic-zone/wrapper/relations/extra-wide-icon-cards-grid-section"
import ContentCarousel from "@/components/dynamic-zone/wrapper/sections/content-carousel"

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
    case "sections.quote-section":
      return <QuoteSection key={`section_quote_${index}`} section={section} />
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
    case "sections.feature-cards":
      return <FeatureCards key={`feature_cards_${index}`} section={section} />
    case "sections.content-carousel":
      return (
        <ContentCarousel
          key={`sections.content-carousel_${index}`}
          section={section}
        />
      )
    case "sections.services-section":
      return (
        <ServicesSection
          key={`section_services-section_${index}`}
          section={section}
        />
      )
    case "relations.section-solutions-relation":
      return (
        <SectionSolutionsRelation
          key={`relations.section-solutions-relation_${index}`}
          section={section}
        />
      )
    case "relations.sla-card-section":
      return (
        <SlaCardSection
          key={`relations.sla-card-section_${index}`}
          section={section}
        />
      )
    case "sections.color-card-slider-section":
      return (
        <ColorCardSliderSection
          key={`sections.color-card-slider-section_${index}`}
          section={section}
        />
      )
    case "sections.product-feature-card":
      return (
        <ProductFeatureCard
          key={`sections.product-feature-card_${index}`}
          section={section}
        />
      )
    case "sections.info-details-section":
      return (
        <InfoDetailsSection
          key={`sections.info-details-section_${index}`}
          section={section}
        />
      )
    case "relations.extra-wide-icon-cards-grid-section":
      return (
        <ExtraWideIconCardsGridSection
          key={`sections.info-details-section_${index}`}
          section={section}
        />
      )
    default:
      return (
        <p key={`section_${index}`}>
          Unknown section {JSON.stringify(section)}
        </p>
      )
  }
}
