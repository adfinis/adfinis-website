// import type { Core } from '@strapi/strapi';

import {Core} from '@strapi/strapi'
import {ContentType} from '@strapi/types/dist/uid'

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
    'sections.video-with-text-section': {
      populate: '*',
    },
    'sections.sla-card-section': {
      populate: '*',
    }
  }
}

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
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('bbb')
    async function things() {
      //
    }
    things().then(() => {
      console.log('done')
    });
  },
};

async function oneOffCopyHerosToEnAu() {
  const customCollectionTypes = Object.keys(strapi.contentTypes).filter(key => key.startsWith('api::'));
  const count = await strapi.documents('api::hero.hero').count({locale: 'en'});
  const docs = await strapi.documents('api::hero.hero').findMany({
    locale: 'en',
    populate: ["color", "background_image", "cta", "logo"]
  });
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      color: (({ id, ...rest }) => rest)(doc.color),
      cta: doc.cta
        ? (({ id, ...rest }) => rest)(doc.cta)
        : null,
    };

    const res = await strapi.documents('api::hero.hero').update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyIconCardsToEnAu() {
  const target = 'api::icon-card.icon-card';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: ["icon_image", "cta"]
  });
  console.log(docs.length, count, docs[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      cta: doc.cta
        ? (({ id, ...rest }) => rest)(doc.cta)
        : null,
    };

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyCardProductToEnAu() {
  const target = 'api::card-product.card-product';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: ["image", "ctas"]
  });
  console.log(docs.length, count, docs[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      ctas: doc.ctas
        ? doc.ctas.map(({id, ...rest}) => ({
          ...rest,
        }))
        : [],
    };

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyCategoriesToEnAu() {
  const target = 'api::category.category';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    // populate: ["image", "ctas"]
  });
  console.log(docs.length, count, docs[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
    };

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyContentOfferToEnAu() {
  const target = 'api::content-offer.content-offer';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: ["cover_image", "download_file"]
  });
  console.log(docs.length, count, docs[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
    };

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyQutoesToEnAu() {
  const target = 'api::quote.quote';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: ['image']
  });
  console.log(docs.length, count, docs[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
    };

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopySLACardToEnAu() {
  const target = 'api::sla-card.sla-card';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: '*'
  })
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, createdBy, updatedBy, localizations, ...rest} = doc;
    const copyDoc = {
      ...rest,
    };

    console.log(copyDoc, {id})

    const res = await strapi.documents(target).update({
      documentId,
      locale: 'en-AU',
      data: copyDoc as any,
    })
    console.log(res)
  }
}

async function oneOffCopyCaseStudyOverviewToEnAu() {
  const target = 'api::case-studies-overview.case-studies-overview';
  const count = await strapi.documents(target).count({locale: 'en'});
  const singleType = await strapi.documents(target).findFirst({
    locale: 'en',
    populate: ["hero", "sections"]
  })

  const {id, locale, documentId, updatedAt, createdAt, ...rest} = singleType;
  const copyDoc = {
    ...rest,
    hero: (({ id, locale, ...rest }) => rest)(singleType.hero),
  }

  console.log({copyDoc})

  const res = await strapi.documents(target).update({
    documentId,
    locale: 'en-AU',
    data: copyDoc as any,
  })
  console.log(res)
  const publish = await strapi.documents(target).publish({
    documentId,
    locale: 'en-AU',
  })
  console.log(publish)
}

async function oneOffFooterToEnAu() {
  const target = 'api::footer.footer';
  const singleType = await strapi.documents(target).findFirst({
    locale: 'en',
    populate: '*'
  })

  const {id, locale, documentId, updatedAt, createdAt, updatedBy, createdBy, localizations, ...rest} = singleType;
  const copyDoc = {
    ...rest,
    solutions: singleType.solutions.map(({id, locale, ...rest}) => rest),
    partner_and_products: singleType.partner_and_products.map(({id, locale, ...rest}) => rest),
  }

  console.log(copyDoc)
  // // console.log(copyDoc.sections[0])
  //
  // const res = await strapi.documents(target).update({
  //   documentId,
  //   locale: 'en-AU',
  //   data: copyDoc as any,
  // })
  // console.log(res)
  // const publish = await strapi.documents(target).publish({
  //   documentId,
  //   locale: 'en-AU',
  // })
  // console.log(publish)
}

async function oneOffEventsOverviewToEnAu() {
  const target = 'api::events-overview.events-overview';
  const singleType = await strapi.documents(target).findFirst({
    locale: 'en',
    populate: {
      hero: true,
      sections,
    }
  })

  const {id, locale, documentId, updatedAt, createdAt, ...rest} = singleType;
  const copyDoc = {
    ...rest,
    hero: (({ id, locale, ...rest }) => rest)(singleType.hero),
    sections: ((sections) => {
      return sections.map(({id, ...section}) => {
        if (section.__component === 'sections.content-carousel') {
          return {
            ...section,
            cards: section.cards.map(card => ({
              ...card,
              href: card.href.replace('/en/', '/en-AU/'),
              categories: card.categories.map(({id, locale, ...rest}) => rest),
            }))
          };
        }
        return section;
      });
    })(singleType.sections),
  }

  console.log(copyDoc)
  // console.log(copyDoc.sections[0])

  const res = await strapi.documents(target).update({
    documentId,
    locale: 'en-AU',
    data: copyDoc as any,
  })
  console.log(res)
  const publish = await strapi.documents(target).publish({
    documentId,
    locale: 'en-AU',
  })
  console.log(publish)
}
async function oneOffCopyPageWIP() {
  const target = 'api::page.page';
  const count = await strapi.documents(target).count({locale: 'en'});
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: {
      "hero": {
        populate: ["color"],
      },
      sections
    }
  });
  // console.log(docs.length, count, docs[0], docs[0].sections[0])
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
    };

    if (id === 9) {
      console.log(copyDoc, {id})
    }

    // const res = await strapi.documents(target).update({
    //   documentId,
    //   locale: 'en-AU',
    //   data: copyDoc as any,
    // })
    // console.log(res)
  }
}
