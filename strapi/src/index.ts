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
  const target = 'api::hero.hero';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: ["color", "background_image", "cta", "logo"]
  });
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      color: (({ id, ...rest }) => rest)(doc.color),
      cta: transformCta(doc.cta),
    };

    const res = await strapi.documents(target).update({
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
      cta: transformCta(doc.cta),
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
      ctas: transformCtas(doc.ctas)
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
      url: replaceEnWithAu(doc.url),
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
    const publish = await strapi.documents(target).publish({
      documentId,
      locale: 'en-AU',
    })
    console.log(publish)
  }
}

async function oneOffCopyQuotesToEnAu() {
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

async function oneOffCopyEventsPageToEnAu() {
  const target = 'api::event-page.event-page';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
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
      hero: (({ id, locale, ...rest }) => rest)(doc.hero),
      sign_up_button: (({id, ...rest}) => rest)(doc.sign_up_button),
      sections: doc.sections.map(({ id, ...section }) => {
        const transform = transformers[section.__component] || (s => s)
        return transform(section)
      })
    };
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
}

async function oneOffCopyNewsToEnAu() {
  const target = 'api::news-page.news-page';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
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
}

async function oneOffCopyPagesToEnAu() {
  const target = 'api::page.page';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
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
    }
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
}

async function oneOffCopyPageStudyToEnAu() {
  const target = 'api::page-case-study.page-case-study';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: {
      "hero": {
        populate: ["color"],
      },
      sections
    }
  });
  console.log(docs)
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      sections: doc.sections.map(({ id, ...section }) => {
        const transform = transformers[section.__component] || (s => s)
        return transform(section)
      })
    }
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
}

async function oneOffCopyPartnerProductsToEnAu() {
  const target = 'api::page-partner-and-product.page-partner-and-product';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: {
      "hero": {
        populate: ["color"],
      },
      sections
    }
  })
  console.log(docs)
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      sections: doc.sections.map(({ id, ...section }) => {
        const transform = transformers[section.__component] || (s => s)
        return transform(section)
      })
    }
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
}

async function oneOffCopySolutionsToEnAu() {
  const target = 'api::solutions-page.solutions-page';
  const docs = await strapi.documents(target).findMany({
    locale: 'en',
    populate: {
      "hero": {
        populate: ["color"],
      },
      sections
    }
  })
  console.log(docs)
  for (const doc of docs) {
    const {id, locale, documentId, updatedAt, createdAt, ...rest} = doc;
    const copyDoc = {
      ...rest,
      sections: doc.sections.map(({ id, ...section }) => {
        const transform = transformers[section.__component] || (s => s)
        return transform(section)
      })
    }
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
    sections: singleType.sections.map(({ id, ...section }) => {
      const transform = transformers[section.__component] || (s => s)
      return transform(section)
    })
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

const replaceEnWithAu = href => href?.replace('ondigitalocean.app/en/', 'ondigitalocean.app/en-AU/')
const transformCta = cta => cta ? { ...cta, href: replaceEnWithAu(cta.href) } : cta

const transformCtas = ctas =>
  ctas?.map(({ id, ...rest }) => ({
    ...rest,
    href: replaceEnWithAu(rest.href)
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
      href: replaceEnWithAu(href),
      categories: categories.map(({ id, locale, ...cat }) => cat)
    }))
  }),
  'sections.cta-banner': section => ({
    ...section,
    cta: transformCta(section.cta)
  })
}
