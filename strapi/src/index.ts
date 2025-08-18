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
  bootstrap({strapi}: { strapi: Core.Strapi }) {
    const locales = ['en', 'en-AU', 'de', 'de-CH', 'nl']
    const apis = [
      {target: 'api::icon-card.icon-card', column: 'name', publish: false},
      {target: 'api::quote.quote', column: 'name', publish: false},
      {target: 'api::card-product.card-product', column: 'name', publish: false},
      {target: 'api::content-offer.content-offer', column: 'name', publish: true},
      {target: 'api::hallmark.hallmark', column: 'title', publish: false},
      {target: 'api::hero.hero', column: 'name', publish: false},
      {target: 'api::page.page', column: 'metadata_title', publish: true},
      {target: 'api::page-case-study.page-case-study', column: 'metadata_title', publish: true},
      {target: 'api::event-page.event-page', column: 'metadata_title', publish: true},
      {target: 'api::news-page.news-page', column: 'metadata_title', publish: true},
      {target: 'api::page-partner-and-product.page-partner-and-product', column: 'metadata_title', publish: true},
      {target: 'api::solutions-page.solutions-page', column: 'metadata_title', publish: true},
    ]

    async function setInternalName() {
      for (const api of apis) {
        const {target, column, publish} = api
        for (const locale of locales) {
          // @ts-ignore
          const items = await strapi.documents(target).findMany({
            locale,
            filters: {
              // @ts-ignore
              internal_name: {
                $null: true
              }
            }
          })
          for (const item of items) {
            // @ts-ignore
            await strapi.documents(target).update({
              documentId: item.documentId,
              locale: item.locale,
              data: {
                // @ts-ignore
                internal_name: item[column]
              },
            })
            if (publish) {
              // @ts-ignore
              await strapi.documents(target).publish({
                documentId: item.documentId,
                locale: item.locale,
              })
            }
          }
        }
      }
    }

    console.log('Start setting internal name')
    setInternalName().then(() => {
      console.log('Finished setting internal name!')
    })
  },
};
