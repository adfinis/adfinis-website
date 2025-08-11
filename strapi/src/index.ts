// import type { Core } from '@strapi/strapi';

import {Core} from '@strapi/strapi'
import {str} from 'ajv'

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
    const locales = ['en', 'en-AU', 'de', 'de-CH', 'nl']
    async function setInternalNameIconCard() {
      const target = 'api::icon-card.icon-card'
      for (const locale of locales) {
        const items = await strapi.documents(target).findMany({
          locale,
          filters: {
            internal_name: {
              $null: true
            }
          }
        })
        console.log(items)
        for (const item of items) {
          await strapi.documents(target).update({
            documentId: item.documentId,
            locale: item.locale,
            data: {
              internal_name: item.name
            },
          })
        }
      }
    }
    async function setInternalNameCardProduct() {
      const target = 'api::card-product.card-product'
      for (const locale of locales) {
        const items = await strapi.documents(target).findMany({
          locale,
          filters: {
            internal_name: {
              $null: true
            }
          }
        })
        console.log(items)
        for (const item of items) {
          await strapi.documents(target).update({
            documentId: item.documentId,
            locale: item.locale,
            data: {
              internal_name: item.name
            },
          })
        }
      }
    }
    async function setInternalNameContentOffer() {
      const target = 'api::content-offer.content-offer'
      for (const locale of locales) {
        const items = await strapi.documents(target).findMany({
          locale,
          filters: {
            internal_name: {
              $null: true
            }
          }
        })
        console.log(items)
        for (const item of items) {
          await strapi.documents(target).update({
            documentId: item.documentId,
            locale: item.locale,
            data: {
              internal_name: item.name
            },
          })
        }
      }
    }
    async function run() {
      await setInternalNameIconCard()
      await setInternalNameCardProduct()
      await setInternalNameContentOffer()
    }
    run()
  },
};
