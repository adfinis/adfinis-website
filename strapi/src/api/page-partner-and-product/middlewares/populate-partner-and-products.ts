"use strict";

const populate = {
  localizations: true,
  hero: {
    populate: '*'
  },
  intro: {
    populate: true,
  },
  sections: {
    on: {
      'sections.two-column-section': {
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
    },
  }
};

module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    ctx.query = {
      populate,
    }

    return next();
  };
};
