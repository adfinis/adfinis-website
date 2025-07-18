// import type { Core } from '@strapi/strapi';

import {Core} from '@strapi/strapi'
import {ContentType} from '@strapi/types/dist/uid'

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
