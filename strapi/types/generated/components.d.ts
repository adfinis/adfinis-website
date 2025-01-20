import type { Schema, Struct } from '@strapi/strapi';

export interface CardsCardSliderIntro extends Struct.ComponentSchema {
  collectionName: 'components_cards_card_slider_intros';
  info: {
    displayName: 'Card Slider Intro';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    external_ctas: Schema.Attribute.Component<
      'external-links.call-to-action',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsColorCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_color_cards';
  info: {
    displayName: 'Color Card';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'white',
        'stone',
        'biscay',
        'sapphire',
        'jumbo',
        'neutral',
        'sunglow',
        'sky',
        'cinnamon',
        'green',
        'razzmatazz',
        'fuchsia',
        'manhattan',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sky'>;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsEventCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_event_cards';
  info: {
    description: '';
    displayName: 'Event Card';
  };
  attributes: {
    background_image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsIconCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_icon_cards';
  info: {
    description: '';
    displayName: 'Icon Card';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'external-links.call-to-action', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 2;
        },
        number
      >;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      [
        'icon_build',
        'icon_calendar',
        'icon_compliance',
        'icon_employees',
        'icon_flexible-hours',
        'icon_founded',
        'icon_open-source',
        'icon_plan',
        'icon_projects',
        'icon_remote',
        'icon_run',
        'icon_solutions',
        'icon_training',
        'icon_workflow',
        'icon_workspace',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'icon_build'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsKpiCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_kpi_cards';
  info: {
    description: '';
    displayName: 'KPI card';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'white',
        'stone',
        'biscay',
        'sapphire',
        'jumbo',
        'neutral',
        'sunglow',
        'sky',
        'cinnamon',
        'green',
        'razzmatazz',
        'fuchsia',
        'manhattan',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sapphire'>;
    description: Schema.Attribute.String;
    icon_image: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CardsProjectCardWithExternalCta
  extends Struct.ComponentSchema {
  collectionName: 'components_cards_project_card_with_external_ctas';
  info: {
    description: '';
    displayName: 'Project card with external CTA';
  };
  attributes: {
    cta: Schema.Attribute.Component<'external-links.call-to-action', false>;
    image: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    intro: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsSimpleCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_simple_cards';
  info: {
    displayName: 'Simple card';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ExternalLinksCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_external_links_call_to_actions';
  info: {
    displayName: 'Call to action';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://adfinis.com/contact'>;
    is_disabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Call to action'>;
    size: Schema.Attribute.Enumeration<['large', 'small']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'large'>;
    variant: Schema.Attribute.Enumeration<['cta', 'primary', 'secondary']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'cta'>;
  };
}

export interface ExternalLinksLinkWithChevron extends Struct.ComponentSchema {
  collectionName: 'components_external_links_link_with_chevrons';
  info: {
    displayName: 'Link with chevron';
    icon: 'link';
  };
  attributes: {
    chavron: Schema.Attribute.Enumeration<['none', 'left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    href: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://adfinis.com/contact'>;
    is_disabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Button text'>;
    size: Schema.Attribute.Enumeration<['large', 'small']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'large'>;
  };
}

export interface GlobalBlogBlock extends Struct.ComponentSchema {
  collectionName: 'components_global_blog_blocks';
  info: {
    description: '';
    displayName: 'Blog Block';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'external-links.call-to-action', false>;
  };
}

export interface GlobalBrandColors extends Struct.ComponentSchema {
  collectionName: 'components_global_brand_colors';
  info: {
    displayName: 'Brand Colors';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'white',
        'stone',
        'biscay',
        'sapphire',
        'jumbo',
        'neutral',
        'sunglow',
        'sky',
        'cinnamon',
        'green',
        'razzmatazz',
        'fuchsia',
        'manhattan',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'white'>;
  };
}

export interface GlobalEventCategory extends Struct.ComponentSchema {
  collectionName: 'components_global_event_categories';
  info: {
    displayName: 'Event category';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalHallmark extends Struct.ComponentSchema {
  collectionName: 'components_global_hallmarks';
  info: {
    displayName: 'Hallmark';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalHeroWithCta extends Struct.ComponentSchema {
  collectionName: 'components_global_hero_with_ctas';
  info: {
    displayName: 'Hero with CTA';
  };
  attributes: {
    cta: Schema.Attribute.Component<'external-links.call-to-action', false>;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    image: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.RichText;
  };
}

export interface GlobalIntro extends Struct.ComponentSchema {
  collectionName: 'components_global_intros';
  info: {
    displayName: 'Intro';
  };
  attributes: {
    intro_body: Schema.Attribute.RichText & Schema.Attribute.Required;
    intro_title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface GlobalIntroBody extends Struct.ComponentSchema {
  collectionName: 'components_global_intro_bodies';
  info: {
    displayName: 'Intro Body';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface GlobalSlaItem extends Struct.ComponentSchema {
  collectionName: 'components_global_sla_items';
  info: {
    description: '';
    displayName: 'SLA Item';
  };
  attributes: {
    is_disabled: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RelationsCalendlySection extends Struct.ComponentSchema {
  collectionName: 'components_relations_calendly_sections';
  info: {
    displayName: 'Calendly Section';
  };
  attributes: {
    calendly_item: Schema.Attribute.Relation<
      'oneToOne',
      'api::calendly-item.calendly-item'
    >;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
  };
}

export interface RelationsQuotesRelation extends Struct.ComponentSchema {
  collectionName: 'components_relations_quotes_relations';
  info: {
    displayName: 'Quotes Relation';
  };
  attributes: {
    quotes: Schema.Attribute.Relation<'oneToMany', 'api::quote.quote'>;
  };
}

export interface RelationsSectionSolutionsRelation
  extends Struct.ComponentSchema {
  collectionName: 'components_relations_section_solutions_relations';
  info: {
    description: '';
    displayName: 'Section Solutions Relation';
  };
  attributes: {
    section_props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    solutions: Schema.Attribute.Component<
      'relations.solutions-relation-with-description',
      true
    >;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RelationsSlaCardSection extends Struct.ComponentSchema {
  collectionName: 'components_relations_sla_card_sections';
  info: {
    description: '';
    displayName: 'SLA Card Section';
  };
  attributes: {
    section_props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    sla_cards: Schema.Attribute.Relation<'oneToMany', 'api::sla-card.sla-card'>;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RelationsSolutionsRelationWithDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_relations_solutions_relation_with_descriptions';
  info: {
    description: '';
    displayName: 'Solutions Relation With Description';
  };
  attributes: {
    card_image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    description: Schema.Attribute.RichText;
    solution_page: Schema.Attribute.Relation<
      'oneToOne',
      'api::solutions-page.solutions-page'
    >;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RelationsWhitePaperSection extends Struct.ComponentSchema {
  collectionName: 'components_relations_white_paper_sections';
  info: {
    displayName: 'White Paper Section';
  };
  attributes: {
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    white_paper: Schema.Attribute.Relation<
      'oneToOne',
      'api::white-paper.white-paper'
    >;
  };
}

export interface RichHeadingsH1 extends Struct.ComponentSchema {
  collectionName: 'components_rich_headings_h1s';
  info: {
    description: '';
    displayName: 'H1';
    icon: 'hashtag';
  };
  attributes: {
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RichHeadingsH2 extends Struct.ComponentSchema {
  collectionName: 'components_rich_headings_h2s';
  info: {
    displayName: 'H2';
    icon: 'hashtag';
  };
  attributes: {
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface RichHeadingsH3 extends Struct.ComponentSchema {
  collectionName: 'components_rich_headings_h3s';
  info: {
    displayName: 'H3';
    icon: 'hashtag';
  };
  attributes: {
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsColorCardSliderSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_color_card_slider_sections';
  info: {
    description: '';
    displayName: 'Color card slider section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'cards.color-card', true>;
    ctas: Schema.Attribute.Component<'external-links.call-to-action', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsEventsSectionWithIntroAndCta
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_events_section_with_intro_and_ctas';
  info: {
    description: '';
    displayName: 'Events section with intro and CTA';
  };
  attributes: {
    cta: Schema.Attribute.Component<'external-links.call-to-action', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.RichText;
    events: Schema.Attribute.Component<'cards.event-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsGroupTitleWithExternalLink
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_group_title_with_external_links';
  info: {
    description: '';
    displayName: 'Group title with external link';
  };
  attributes: {
    external_cta_link: Schema.Attribute.Component<
      'external-links.call-to-action',
      false
    >;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsGroupTitleWithRichIntro
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_group_title_with_rich_intros';
  info: {
    displayName: 'Group title with rich intro';
    icon: 'bulletList';
  };
  attributes: {
    intro: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeadingWithLinkContainer
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_heading_with_link_containers';
  info: {
    description: '';
    displayName: 'Heading with link container';
    icon: 'layer';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<
      ['white', 'neutral', 'sapphire', 'stone']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'neutral'>;
    padding: Schema.Attribute.Enumeration<
      ['no-padding', 'both-padding', 'start-padding']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'both-padding'>;
    section_group_with_external_link: Schema.Attribute.Component<
      'sections.group-title-with-external-link',
      false
    >;
  };
}

export interface SectionsIconCardSectionWithCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_icon_card_section_with_ctas';
  info: {
    description: '';
    displayName: 'Icon card section with CTA';
  };
  attributes: {
    icon_cards: Schema.Attribute.Component<'cards.icon-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsIconCardSectionWithExternalCtAs
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_icon_card_section_with_external_ct_as';
  info: {
    description: '';
    displayName: 'Icon card section with external CTAs';
  };
  attributes: {
    cards: Schema.Attribute.Component<'cards.icon-card', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    section_props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsIconCardSectionWithRelation
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_icon_card_section_with_relations';
  info: {
    description: '';
    displayName: 'Icon card section with relation';
  };
  attributes: {
    cards: Schema.Attribute.Relation<'oneToMany', 'api::icon-card.icon-card'>;
    cta: Schema.Attribute.Component<'external-links.call-to-action', false>;
    section_props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsKpiSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_kpi_sections';
  info: {
    displayName: 'KPI Section';
  };
  attributes: {
    cards: Schema.Attribute.Relation<'oneToMany', 'api::icon-card.icon-card'>;
    cta: Schema.Attribute.Component<'external-links.call-to-action', false>;
    section_props: Schema.Attribute.Component<'sections.section-props', false>;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsKpiWithIntroAndHallmarksSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_kpi_with_intro_and_hallmarks_sections';
  info: {
    description: '';
    displayName: 'KPI with intro and hallmarks section';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    hallmark: Schema.Attribute.Relation<'oneToOne', 'api::hallmark.hallmark'>;
    kpis: Schema.Attribute.Component<'cards.kpi-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsProjectCardsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_project_cards_sections';
  info: {
    description: '';
    displayName: 'Project Cards Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<
      'cards.project-card-with-external-cta',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsProjectsCardSectionWithExternalLink
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_projects_card_section_with_external_links';
  info: {
    description: '';
    displayName: 'Projects card section with external link';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    projects: Schema.Attribute.Component<
      'cards.project-card-with-external-cta',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSectionProps extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_props';
  info: {
    description: '';
    displayName: 'Section props';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<
      ['white', 'neutral', 'sapphire', 'stone']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'neutral'>;
    padding: Schema.Attribute.Enumeration<
      ['no-padding', 'both-padding', 'start-padding']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'both-padding'>;
  };
}

export interface SectionsSectionWithRichtHeadingIntroAndCta
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_with_richt_heading_intro_and_ctas';
  info: {
    description: '';
    displayName: 'Section with rich heading, intro and CTA';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'external-links.call-to-action', true>;
    intro: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_sections';
  info: {
    displayName: 'Services Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'cards.simple-card', true> &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    ctas: Schema.Attribute.Component<'external-links.call-to-action', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTextSectionWithCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_section_with_ctas';
  info: {
    displayName: 'Text Section With CTA';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'external-links.call-to-action', false> &
      Schema.Attribute.Required;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsTwoColumnSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_two_column_sections';
  info: {
    displayName: 'Two Column Section';
  };
  attributes: {
    left_column: Schema.Attribute.RichText & Schema.Attribute.Required;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    right_column: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_sections';
  info: {
    description: '';
    displayName: 'Video Section';
    icon: 'play';
  };
  attributes: {
    embed_html: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'use this tool to embed video https://embedresponsively.com/'>;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    section_title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsVideoWithTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_with_text_sections';
  info: {
    displayName: 'Video With Text Section';
    icon: 'play';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    embed_html: Schema.Attribute.Text & Schema.Attribute.Required;
    props: Schema.Attribute.Component<'sections.section-props', false> &
      Schema.Attribute.Required;
    section_title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.card-slider-intro': CardsCardSliderIntro;
      'cards.color-card': CardsColorCard;
      'cards.event-card': CardsEventCard;
      'cards.icon-card': CardsIconCard;
      'cards.kpi-card': CardsKpiCard;
      'cards.project-card-with-external-cta': CardsProjectCardWithExternalCta;
      'cards.simple-card': CardsSimpleCard;
      'external-links.call-to-action': ExternalLinksCallToAction;
      'external-links.link-with-chevron': ExternalLinksLinkWithChevron;
      'global.blog-block': GlobalBlogBlock;
      'global.brand-colors': GlobalBrandColors;
      'global.event-category': GlobalEventCategory;
      'global.hallmark': GlobalHallmark;
      'global.hero-with-cta': GlobalHeroWithCta;
      'global.intro': GlobalIntro;
      'global.intro-body': GlobalIntroBody;
      'global.sla-item': GlobalSlaItem;
      'relations.calendly-section': RelationsCalendlySection;
      'relations.quotes-relation': RelationsQuotesRelation;
      'relations.section-solutions-relation': RelationsSectionSolutionsRelation;
      'relations.sla-card-section': RelationsSlaCardSection;
      'relations.solutions-relation-with-description': RelationsSolutionsRelationWithDescription;
      'relations.white-paper-section': RelationsWhitePaperSection;
      'rich-headings.h1': RichHeadingsH1;
      'rich-headings.h2': RichHeadingsH2;
      'rich-headings.h3': RichHeadingsH3;
      'sections.color-card-slider-section': SectionsColorCardSliderSection;
      'sections.events-section-with-intro-and-cta': SectionsEventsSectionWithIntroAndCta;
      'sections.group-title-with-external-link': SectionsGroupTitleWithExternalLink;
      'sections.group-title-with-rich-intro': SectionsGroupTitleWithRichIntro;
      'sections.heading-with-link-container': SectionsHeadingWithLinkContainer;
      'sections.icon-card-section-with-cta': SectionsIconCardSectionWithCta;
      'sections.icon-card-section-with-external-ct-as': SectionsIconCardSectionWithExternalCtAs;
      'sections.icon-card-section-with-relation': SectionsIconCardSectionWithRelation;
      'sections.kpi-section': SectionsKpiSection;
      'sections.kpi-with-intro-and-hallmarks-section': SectionsKpiWithIntroAndHallmarksSection;
      'sections.project-cards-section': SectionsProjectCardsSection;
      'sections.projects-card-section-with-external-link': SectionsProjectsCardSectionWithExternalLink;
      'sections.section-props': SectionsSectionProps;
      'sections.section-with-richt-heading-intro-and-cta': SectionsSectionWithRichtHeadingIntroAndCta;
      'sections.services-section': SectionsServicesSection;
      'sections.text-section-with-cta': SectionsTextSectionWithCta;
      'sections.two-column-section': SectionsTwoColumnSection;
      'sections.video-section': SectionsVideoSection;
      'sections.video-with-text-section': SectionsVideoWithTextSection;
    }
  }
}
