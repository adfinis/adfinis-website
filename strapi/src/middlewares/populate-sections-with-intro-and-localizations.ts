"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      populate: {
        localizations: {
          populate: "*",
        },
        seo: {
          populate: "*",
        },
        hero: {
          populate: "*",
        },
        sections: {
          on: {
            "sections.color-card-carousel": {
              populate: "*",
            },
            "sections.extra-wide-icon-cards-grid-section": {
              populate: {
                cards: {
                  populate: "*",
                },
                props: {
                  populate: "*",
                },
                cta: {
                  populate: "*",
                },
              },
            },
            "sections.product-feature-card": {
              populate: {
                props: {
                  populate: "*",
                },
                cards: {
                  populate: "*",
                },
              },
            },
            "sections.content-carousel": {
              populate: {
                props: {
                  populate: "*",
                },
                cta: {
                  populate: "*",
                },
                cards: {
                  populate: "*",
                },
              },
            },
            "sections.sla-card-section": {
              populate: {
                props: {
                  populate: "*",
                },
                cards: {
                  populate: "*",
                },
              },
            },
            "sections.two-column-section": {
              populate: "*",
            },
            "sections.cta-banner": {
              populate: "*",
            },
            "sections.single-column-section": {
              populate: "*",
            },
            "sections.blog-content-section": {
              populate: "*",
            },
            "sections.icon-card-section-with-relation": {
              populate: {
                cards: {
                  populate: "*",
                },
                section_props: {
                  populate: "*",
                },
              },
            },
            "sections.content-highlight-section": {
              populate: {
                props: {
                  populate: "*",
                },
                content_offer: {
                  populate: "*",
                },
              },
            },
            "sections.quote-section": {
              populate: {
                quotes: {
                  populate: "*",
                },
              },
            },
            "sections.video-section": {
              populate: "*",
            },
            "sections.hallmarks-section": {
              populate: "*",
            },
            'sections.calendly-section': {
              populate: '*',
            },
            "sections.kpi-section": {
              populate: {
                props: {
                  populate: "*",
                },
                kpis: {
                  populate: "*",
                },
              },
            },
            "sections.video-with-text-section": {
              populate: "*",
            },
            "sections.team-member-card-section": {
              populate: {
                team_members: {
                  populate: "*",
                },
                props: {
                  populate: "*",
                },
              },
            },
            "sections.regular-form-section": {
              populate: "*",
            },
            "sections.career-card-section": {
              populate: {
                cards: {
                  populate: "*",
                },
                props: {
                  populate: "*",
                },
              },
            },
            "sections.location-card-section": {
              populate: {
                cards: {
                  populate: "*",
                },
                props: {
                  populate: "*",
                },
              },
            },
            "sections.services-section": {
              populate: "*",
            },
            "sections.event-details-section": {
              populate: "*",
            },
            "sections.feature-cards": {
              populate: {
                props: {
                  populate: "*",
                },
                features: {
                  populate: "*",
                },
              },
            },
            "sections.image-carousel": {
              populate: {
                props: {
                  populate: "*",
                },
                images: {
                  populate: "*",
                },
                cta: {
                  populate: "*",
                },
              },
            },
          },
        },
      },
    };

    return next();
  };
};
