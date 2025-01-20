"use strict";

module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    ctx.query = {
      ...ctx.query,
      populate: {
        localizations: true,
        hero: {
          populate: '*'
        },
        sections: {
          on: {
            'relations.section-solutions-relation': {
              populate: {
                props: true,
                solutions: {
                  populate: '*'
                }
              },
            },
            'relations.sla-card-section': {
              populate: {
                props: true,
                cards: {
                  populate: '*'
                }
              },
            },
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
            'sections.services-section': {
              populate: '*'
            }
          },
        }
      },
    }

    return next();
  };
};
