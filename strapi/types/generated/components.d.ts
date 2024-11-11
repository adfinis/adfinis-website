import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalHero extends Struct.ComponentSchema {
  collectionName: 'components_global_heroes';
  info: {
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.Blocks & Schema.Attribute.Required;
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
      'global.hero': GlobalHero;
      'global.intro-section': GlobalIntroSection;
    }
  }
}
