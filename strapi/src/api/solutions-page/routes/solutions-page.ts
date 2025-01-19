/**
 * solutions-page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::solutions-page.solutions-page', {
  config: {
    findOne: {
      middlewares: ['api::solutions-page.populate-basic-with-dynamic-zone']
    }
  }
});
