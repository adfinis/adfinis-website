// import type { Core } from '@strapi/strapi';

import {Core} from '@strapi/strapi'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({strapi}: { strapi: Core.Strapi }) {
    const sections = {
      on: {
        'sections.blog-content-section': {
          populate: '*',
        },
        'sections.calendly-section': {
          populate: '*',
        },
        'sections.content-carousel': {
          populate: {
            'props': true,
            'cards': {
              populate: '*',
            },
          }
        },
        'sections.color-card-carousel': {
          populate: '*',
        },
        'sections.career-card-section': {
          populate: {
            'props': true,
            'cards': {
              populate: '*',
            },
          }
        },
        'sections.content-highlight-section': {
          populate: '*',
        },
        'sections.cta-banner': {
          populate: '*',
        },
        'sections.event-details-section': {
          populate: '*',
        },
        'sections.extra-wide-icon-cards-grid-section': {
          populate: '*',
        },
        'sections.feature-cards': {
          populate: {
            'props': true,
            'features': {
              populate: '*',
            }
          },
        },
        'sections.hallmarks-section': {
          populate: '*',
        },
        'sections.icon-card-section-with-relation': {
          populate: '*',
        },
        'sections.image-carousel': {
          populate: '*',
        },
        'sections.kpi-section': {
          populate: '*',
        },
        'sections.location-card-section': {
          populate: '*',
        },
        'sections.product-feature-card': {
          populate: '*',
        },
        'sections.quote-section': {
          populate: '*',
        },
        'sections.regular-form-section': {
          populate: '*',
        },
        'sections.services-section': {
          populate: '*',
        },
        'sections.single-column-section': {
          populate: '*',
        },
        'sections.team-member-card-section': {
          populate: '*',
        },
        'sections.video-section': {
          populate: '*',
        },
        'sections.two-column-section': {
          populate: '*',
        },
        'sections.video-with-text-section': {
          populate: '*',
        },
        'sections.sla-card-section': {
          populate: '*',
        }
      }
    }

    const originLocale = 'de-CH'
    const targetLocale = 'de-DE'

    async function oneOffCopyHeros() {
      const target = 'api::hero.hero';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: ["color", "background_image", "cta", "logo"]
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          color: (({ id, ...rest }) => rest)(doc.color),
          cta: transformCta(doc.cta),
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        })
      }
    }
    async function oneOffCopyIconCards() {
      const target = 'api::icon-card.icon-card';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: ["icon_image", "cta"]
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          cta: transformCta(doc.cta),
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        })
      }
    }
    async function oneOffCopyCardProduct() {
      const target = 'api::card-product.card-product';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: ["image", "ctas"]
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          ctas: transformCtas(doc.ctas)
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        })
      }
    }
    async function oneOffCopyCategories() {
      const target = 'api::category.category';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          url: replaceOriginWithTargetLocale(doc.url),
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        })
      }
    }
    async function oneOffCopyContentOffer() {
      const target = 'api::content-offer.content-offer';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: ["cover_image", "download_file"]
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        });
      }
    }
    async function oneOffCopyQuotes() {
      const target = 'api::quote.quote';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: ['image']
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
      }
    }
    async function oneOffCopySLACard() {
      const target = 'api::sla-card.sla-card';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: '*'
      })
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, createdBy, updatedBy, localizations, ...rest} = doc;
        const copyDoc = {
          ...rest,
          items: doc.items.map(({id, ...item}) => item),
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
      }
    }
    async function oneOffCopyEventsPage() {
      const target = 'api::event-page.event-page';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "hero": {
            populate: ["color"],
          },
          "sign_up_button": true,
          sections,
        }
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          hero: doc.hero ? (({ id, locale, ...rest }) => rest)(doc.hero) : {},
          sign_up_button: (({id, ...rest}) => rest)(doc.sign_up_button),
          sections: doc.sections.map(({ id, ...section }) => {
            const transform = transformers[section.__component] || (s => s)
            return transform(section)
          })
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        });
      }
    }
    async function oneOffCopyNews() {
      const target = 'api::news-page.news-page';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "categories": true,
          "hero": {
            populate: ["color"],
          },
          sections
        }
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        });
      }
    }
    async function oneOffCopyPages() {
      const target = 'api::page.page';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "hero": {
            populate: ["color"],
          },
          sections
        }
      });

      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          sections: doc.sections.map(({ id, ...section }) => {
            const transform = transformers[section.__component] || (s => s)
            return transform(section)
          })
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        })
      }
    }
    async function oneOffCopyPageStudy() {
      const target = 'api::page-case-study.page-case-study';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "hero": {
            populate: ["color"],
          },
          sections
        }
      });
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          sections: doc.sections.map(({ id, ...section }) => {
            const transform = transformers[section.__component] || (s => s)
            return transform(section)
          })
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        })
      }
    }
    async function oneOffCopyPartnerProducts() {
      const target = 'api::page-partner-and-product.page-partner-and-product';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "hero": {
            populate: ["color"],
          },
          sections
        }
      })
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          sections: doc.sections.map(({ id, ...section }) => {
            const transform = transformers[section.__component] || (s => s)
            return transform(section)
          })
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        })
      }
    }
    async function oneOffCopySolutions() {
      const target = 'api::solutions-page.solutions-page';
      const docs = await strapi.documents(target).findMany({
        locale: originLocale,
        populate: {
          "hero": {
            populate: ["color"],
          },
          sections
        }
      })
      for (const doc of docs) {
        const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
        const copyDoc = {
          ...rest,
          sections: doc.sections.map(({ id, ...section }) => {
            const transform = transformers[section.__component] || (s => s)
            return transform(section)
          })
        };
        await strapi.documents(target).update({
          documentId,
          locale: targetLocale,
          data: copyDoc as any,
        });
        await strapi.documents(target).publish({
          documentId,
          locale: targetLocale,
        });
      }
    }
    async function oneOffCopyCaseStudyOverview() {
      const target = 'api::case-studies-overview.case-studies-overview';
      const singleType = await strapi.documents(target).findFirst({
        locale: originLocale,
        populate: {
          hero: true,
          sections,
        }
      })
      const {id, locale, documentId, updatedAt, createdAt, ...rest} = singleType;
      const copyDoc = {
        ...rest,
        hero: (({ id, locale, ...rest }) => rest)(singleType.hero),
        sections: singleType.sections.map(({ id, ...section }) => {
          const transform = transformers[section.__component] || (s => s)
          return transform(section)
        })
      };
      await strapi.documents(target).update({
        documentId,
        locale: targetLocale,
        data: copyDoc as any,
      });
      await strapi.documents(target).publish({
        documentId,
        locale: targetLocale,
      })
    }
    async function oneOffEventsOverview() {
      const target = 'api::events-overview.events-overview';
      const singleType = await strapi.documents(target).findFirst({
        locale: originLocale,
        populate: {
          hero: true,
          sections,
        }
      });
      const {id, locale, documentId, updatedAt, createdAt, ...rest} = singleType;
      const copyDoc = {
        ...rest,
        hero: (({ id, locale, ...rest }) => rest)(singleType.hero),
        sections: singleType.sections.map(({ id, ...section }) => {
          const transform = transformers[section.__component] || (s => s)
          return transform(section)
        })
      };
      await strapi.documents(target).update({
        documentId,
        locale: targetLocale,
        data: copyDoc as any,
      });
      await strapi.documents(target).publish({
        documentId,
        locale: targetLocale,
      })
    }
    async function oneOffFooter() {
      const target = 'api::footer.footer';
      const singleType = await strapi.documents(target).findFirst({
        locale: originLocale,
        populate: '*'
      });
      const {id, locale, documentId, updatedAt, createdAt, updatedBy, createdBy, localizations, ...rest} = singleType;
      const copyDoc = {
        ...rest,
        solutions: singleType.solutions.map(({id, locale, ...rest}) => rest),
        partner_and_products: singleType.partner_and_products.map(({id, locale, ...rest}) => rest),
      };
      await strapi.documents(target).update({
        documentId,
        locale: targetLocale,
        data: copyDoc as any,
      });
      await strapi.documents(target).publish({
        documentId,
        locale: targetLocale,
      });
    }
    const replaceOriginWithTargetLocale = href => href?.replace(`/${originLocale.toLowerCase()}/`, `/${targetLocale.toLowerCase()}/`)
    const transformCta = cta => {
      if (!cta) return cta
      const {id, ...rest} = cta
      return {
        ...rest,
        href: replaceOriginWithTargetLocale(cta.href)
      }
    }
    const transformCtas = ctas =>
      ctas?.map(({ id, ...rest }) => ({
        ...rest,
        href: replaceOriginWithTargetLocale(rest.href)
      })) ?? []
    const transformers = {
      'sections.two-column-section': section => ({
        ...section,
        cta: transformCta(section.cta)
      }),
      'sections.single-column-section': section => ({
        ...section,
        cta: transformCta(section.cta)
      }),
      'sections.services-section': section => ({
        ...section,
        ctas: transformCtas(section.ctas)
      }),
      'sections.image-carousel': section => ({
        ...section,
        cta: transformCta(section.cta)
      }),
      'sections.icon-card-section-with-relation': section => ({
        ...section,
        cta: transformCta(section.cta)
      }),
      'sections.feature-cards': section => ({
        ...section,
        features: section.features.map(item => ({
          ...item,
          cta: transformCta(item.cta)
        }))
      }),
      'sections.content-carousel': section => ({
        ...section,
        cards: section.cards.map(({ categories, href, ...rest }) => ({
          ...rest,
          href: replaceOriginWithTargetLocale(href),
          categories: categories.map(({ id, locale, ...cat }) => cat)
        }))
      }),
      'sections.cta-banner': section => ({
        ...section,
        cta: transformCta(section.cta)
      })
    }
    async function oneOffCopy() {
      await oneOffCopyHeros()
      await oneOffCopyIconCards()
      await oneOffCopyCardProduct()
      await oneOffCopyCategories()
      await oneOffCopyContentOffer()
      await oneOffCopyQuotes()
      await oneOffCopySLACard()
      await oneOffCopyEventsPage()
      // await oneOffCopyNews()
      await oneOffCopyPages()
      await oneOffCopyPageStudy()
      await oneOffCopyPartnerProducts()
      await oneOffCopySolutions()
      await oneOffCopyCaseStudyOverview()
      await oneOffEventsOverview()
      await oneOffFooter()
    }
    oneOffCopy().then(() => {
      console.log('done')
    });
  },
};
