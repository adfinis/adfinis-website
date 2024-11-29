import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'external-links.call-to-action': ExternalLinksCallToAction;
      'external-links.link-with-chevron': ExternalLinksLinkWithChevron;
      'rich-headings.h1': RichHeadingsH1;
      'rich-headings.h2': RichHeadingsH2;
      'rich-headings.h3': RichHeadingsH3;
      'sections.group-title-with-external-link': SectionsGroupTitleWithExternalLink;
      'sections.heading-with-link-container': SectionsHeadingWithLinkContainer;
    }
  }
}
