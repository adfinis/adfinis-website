"use strict";

const populate = {
  localizations: true,
  hero: {
    populate: '*'
  },
  sections: {
    on: {
      'sections.two-column-section': {
        populate: '*',
      },
      'sections.text-section-with-cta': {
        populate: '*',
      },
      'sections.icon-card-section-with-relation': {
        populate: {
          cards: {
            populate: '*',
          },
          section_props: true,
        },
      },
      'relations.white-paper-section': {
        populate: {
          props: true,
          white_paper: {
            populate: '*'
          },
        },
      },
      'relations.quotes-relation': {
        populate: {
          quotes: {
            populate: '*'
          },
        },
      },
      'sections.heading-with-link-container': {
        populate: {
          section_group_with_external_link: {
            populate: '*'
          },
        },
      },
      'sections.video-section': {
        populate: '*',
      },
      'sections.video-with-text-section': {
        populate: '*',
      },
      'sections.kpi-with-intro-and-hallmarks-section': {
        populate: {
          kpis: {
            populate: '*',
          },
          hallmark: {
            populate: true,
          },
        },
      },
    },
  }
};

module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    ctx.query = {
      ...ctx.query,
      populate,
    }

    return next();
  };
};
