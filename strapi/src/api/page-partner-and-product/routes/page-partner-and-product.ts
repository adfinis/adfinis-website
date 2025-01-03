/**
 * page-partner-and-product router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page-partner-and-product.page-partner-and-product', {
  config: {
    findOne: {
      middlewares: ['api::page-partner-and-product.populate-partner-and-products']
    }
  },
});
