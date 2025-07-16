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
      const countDocumentsByLocale = {
        'en': {name: '', count: 0},
        'en-AU': {name: '', count: 0},
        'de': {name: '', count: 0},
        'de-DE': {name: '', count: 0},
        'de-CH': {name: '', count: 0},
        'nl': {name: '', count: 0},
      }

      for (const key of customCollectionTypes) {
        const counts = Object.assign({}, countDocumentsByLocale);
        const locales = Object.keys(counts)
        for (const locale of locales) {
          counts[locale].count = await strapi.documents(key as ContentType).count({ locale })
          counts[locale].name = key.replace('api::', '')
        }
        console.table(counts)
      }
    }
    things().then(() => {
      console.log('done')
    });
    // console.log(countDocumentsByLocale);
  },
};
