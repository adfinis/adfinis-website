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
        sign_up_button: {
          populate: true
        },
        sections: {
          on: {
            'sections.color-card-carousel': {
              populate: '*'
            },
            'sections.product-feature-card': {
              populate: {
                props: true,
                cards: {
                  populate: '*',
                },
              },
            },
            'sections.content-carousel': {
              populate: {
                props: true,
                cta: true,
                events: {
                  populate: '*',
                }
              }
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
            'sections.cta-banner': {
              populate: '*',
            },
            'sections.single-column-section': {
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
            'sections.content-highlight-section': {
              populate: {
                props: true,
                content_offer: {
                  populate: '*'
                },
              },
            },
            'sections.quote-section': {
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
            'sections.hallmarks-section': {
              populate: '*',
            },
            'sections.kpi-section': {
              populate: {
                props: true,
                kpis: {
                  populate: '*',
                },
              },
            },
            'sections.services-section': {
              populate: '*'
            },
            'sections.event-details-section': {
              populate: '*'
            },
            'sections.feature-cards': {
              populate: {
                props: {
                  populate: '*',
                },
                features: {
                  populate: '*',
                },
              }
            }
          },
        }
      },
    }

    return next();
  };
};
