import TwoColumnSection from "@/components/dynamic-zone/wrapper/sections/two-column-section"
import IconCardSectionWithRelation from "@/components/dynamic-zone/wrapper/sections/icon-card-section-with-relation"
import QuoteSection from "@/components/dynamic-zone/wrapper/sections/quote-section"
import VideoSection from "@/components/dynamic-zone/wrapper/sections/video-section"
import VideoWithTextSection from "@/components/dynamic-zone/wrapper/sections/video-with-text-section"
import FeatureCards from "@/components/dynamic-zone/wrapper/sections/feature-cards"
import ServicesSection from "@/components/dynamic-zone/wrapper/sections/services-section"
import SlaCardSection from "@/components/dynamic-zone/wrapper/relations/sla-card-section"
import ProductFeatureCard from "@/components/dynamic-zone/wrapper/relations/product-feature-card"
import EventDetailsSection from "@/components/dynamic-zone/wrapper/sections/event-details-section"
import ExtraWideIconCardsGridSection from "@/components/dynamic-zone/wrapper/relations/extra-wide-icon-cards-grid-section"
import ContentCarousel from "@/components/dynamic-zone/wrapper/sections/content-carousel"
import ContentHighlightSection from "@/components/dynamic-zone/wrapper/sections/content-highlight-section"
import ColorCardCarousel from "@/components/dynamic-zone/wrapper/sections/color-card-carousel"
import CtaBanner from "@/components/dynamic-zone/wrapper/sections/cta-banner"
import SingleColumnSection from "./wrapper/sections/single-column-section"
import HallmarksSection from "@/components/dynamic-zone/wrapper/sections/hallmarks-section"
import KpiSection from "@/components/dynamic-zone/wrapper/sections/kpi-section"
import RegularFormSection from "@/components/dynamic-zone/wrapper/sections/regular-form-section"
import ImageCarousel from "@/components/dynamic-zone/wrapper/sections/image-carousel"
import BlogContentSection from "@/components/dynamic-zone/wrapper/sections/blog-content-section"

export function renderSections(section: any, index: number, locale?: string) {
  switch (section.__component) {
    case "sections.two-column-section":
      return (
        <TwoColumnSection
          key={`section_two_column_${index}`}
          section={section}
        />
      )
    case "sections.cta-banner":
      return (
        <CtaBanner
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
    case "sections.content-highlight-section":
      return (
        <ContentHighlightSection
          key={`sections.content-highlight-section_${index}`}
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
    case "sections.regular-form-section":
      return (
        <RegularFormSection
          key={`sections.regular-form_${index}`}
          locale={locale}
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
    case "sections.hallmarks-section":
      return (
        <HallmarksSection
          key={`sections.hallmarks-section_${index}`}
          section={section}
        />
      )
    case "sections.kpi-section":
      return (
        <KpiSection key={`sections.kpi-section_${index}`} section={section} />
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
    case "relations.sla-card-section":
      return (
        <SlaCardSection
          key={`relations.sla-card-section_${index}`}
          section={section}
        />
      )
    case "sections.color-card-carousel":
      return (
        <ColorCardCarousel
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
    case "sections.event-details-section":
      return (
        <EventDetailsSection
          key={`sections.event-details-section_${index}`}
          section={section}
        />
      )
    case "relations.extra-wide-icon-cards-grid-section":
      return (
        <ExtraWideIconCardsGridSection
          key={`relations.extra-wide-icon-cards-grid-section_${index}`}
          section={section}
        />
      )
    case "sections.single-column-section":
      return (
        <SingleColumnSection
          key={`sections.single-column-section_${index}`}
          section={section}
        />
      )
    case "sections.image-carousel":
      return (
        <ImageCarousel
          key={`sections.image-carousel_${index}`}
          section={section}
        />
      )
    case "sections.blog-content-section":
      return (
        <BlogContentSection
          key={`sections.blog-content-section_${index}`}
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
