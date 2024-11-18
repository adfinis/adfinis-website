import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalCtaExternalUrl extends Struct.ComponentSchema {
  collectionName: 'components_global_cta_external_urls';
  info: {
    displayName: 'CTA external URL';
    icon: 'cursor';
  };
  attributes: {
    external_url: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'http://example.com'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalHero extends Struct.ComponentSchema {
  collectionName: 'components_global_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    Description: Schema.Attribute.RichText & Schema.Attribute.Required;
    external_cta: Schema.Attribute.Component<'global.cta-external-url', false>;
    Title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface GlobalIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_global_intro_sections';
  info: {
    displayName: 'Intro Section';
    icon: 'layer';
  };
  attributes: {
    Paragraph: Schema.Attribute.RichText & Schema.Attribute.Required;
    Title: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.cta-external-url': GlobalCtaExternalUrl;
      'global.hero': GlobalHero;
      'global.intro-section': GlobalIntroSection;
    }
  }
}
