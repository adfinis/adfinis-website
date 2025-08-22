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
    async function setTitleAsDescriptionOnNewsPages() {
      const target = 'api::news-page.news-page';
      for (const originLocale of ['en', 'en-AU', 'de-CH', 'de-CH', 'nl']) {
        const docs = await strapi.documents(target).findMany({
          locale: originLocale,
          filters: {
            $or: [
              {metadata_description: { $null: true }},
              {metadata_description: { $eq: '' }},
            ]
          },
        });
        for (const doc of docs) {
          const {locale, documentId} = doc;
          await strapi.documents(target).update({
            documentId,
            locale,
            data: {
              metadata_description: doc.metadata_title
            },
          });
          await strapi.documents(target).publish({
            documentId,
            locale: locale,
          });
          console.log({documentId})
        }
      }
    }
    setTitleAsDescriptionOnNewsPages().then(() => {
      console.log('bruf')
    })
  },
};
