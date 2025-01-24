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
            'sections.color-card-slider-section': {
              populate: '*'
            },
            'sections.projects-card-section-with-external-link': {
              populate: {
                projects: {
                  populate: '*',
                }
              }
            },
            'relations.product-cards-section': {
              populate: {
                props: true,
                cards: {
                  populate: '*',
                },
              },
            },
            'sections.events-section-with-intro-and-cta': {
              populate: {
                props: true,
                cta: true,
                events: {
                  populate: '*',
                }
              }
            },
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
            },
            'sections.info-details-section': {
              populate: '*'
            }
          },
        }
      },
    }

    return next();
  };
};
