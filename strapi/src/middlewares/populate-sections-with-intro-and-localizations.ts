"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      populate: {
        localizations: true,
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
                props: true,
                cta: true,
              },
            },
            "sections.product-feature-card": {
              populate: {
                props: true,
                cards: {
                  populate: "*",
                },
              },
            },
            "sections.content-carousel": {
              populate: {
                props: true,
                cta: true,
                cards: {
                  populate: "*",
                },
              },
            },
            "sections.sla-card-section": {
              populate: {
                props: true,
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
                section_props: true,
              },
            },
            "sections.content-highlight-section": {
              populate: {
                props: true,
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
                props: true,
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
                props: true,
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
                props: true,
              },
            },
            "sections.location-card-section": {
              populate: {
                cards: {
                  populate: "*",
                },
                props: true,
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
                  populate: true,
                },
                images: {
                  populate: true,
                },
                cta: true,
              },
            },
          },
        },
      },
    };

    return next();
  };
};
