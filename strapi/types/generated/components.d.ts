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

export interface CardsIconCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_icon_cards';
  info: {
    displayName: 'Icon Card';
  };
  attributes: {
    cta: Schema.Attribute.Component<
      'cards.project-card-with-external-cta',
      false
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

export interface CardsProjectCardWithExternalCta
  extends Struct.ComponentSchema {
  collectionName: 'components_cards_project_card_with_external_ctas';
  info: {
    description: '';
    displayName: 'Project card with external CTA';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'external-links.call-to-action', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    image: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.RichText & Schema.Attribute.Required;
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
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    intro: Schema.Attribute.RichText;
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
    displayName: 'Color card slider section';
  };
  attributes: {
    color_cards: Schema.Attribute.Component<'cards.color-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      >;
    intro: Schema.Attribute.Component<'cards.card-slider-intro', false> &
      Schema.Attribute.Required;
  };
}

export interface SectionsGroupTitleWithExternalLink
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_group_title_with_external_links';
  info: {
    displayName: 'Group title with external link';
  };
  attributes: {
    external_cta_link: Schema.Attribute.Component<
      'external-links.call-to-action',
      false
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    displayName: 'Icon card section with CTA';
  };
  attributes: {
    icon_cards: Schema.Attribute.Component<'cards.icon-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SectionsProjectsCardSectionWithExternalLink
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_projects_card_section_with_external_links';
  info: {
    displayName: 'Projects card section with external link';
  };
  attributes: {
    header: Schema.Attribute.Component<
      'sections.group-title-with-rich-intro',
      false
    > &
      Schema.Attribute.Required;
    project_cards: Schema.Attribute.Component<
      'cards.project-card-with-external-cta',
      true
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.card-slider-intro': CardsCardSliderIntro;
      'cards.color-card': CardsColorCard;
      'cards.icon-card': CardsIconCard;
      'cards.project-card-with-external-cta': CardsProjectCardWithExternalCta;
      'external-links.call-to-action': ExternalLinksCallToAction;
      'external-links.link-with-chevron': ExternalLinksLinkWithChevron;
      'global.hero-with-cta': GlobalHeroWithCta;
      'global.intro': GlobalIntro;
      'rich-headings.h1': RichHeadingsH1;
      'rich-headings.h2': RichHeadingsH2;
      'rich-headings.h3': RichHeadingsH3;
      'sections.color-card-slider-section': SectionsColorCardSliderSection;
      'sections.group-title-with-external-link': SectionsGroupTitleWithExternalLink;
      'sections.group-title-with-rich-intro': SectionsGroupTitleWithRichIntro;
      'sections.heading-with-link-container': SectionsHeadingWithLinkContainer;
      'sections.icon-card-section-with-cta': SectionsIconCardSectionWithCta;
      'sections.projects-card-section-with-external-link': SectionsProjectsCardSectionWithExternalLink;
    }
  }
}
