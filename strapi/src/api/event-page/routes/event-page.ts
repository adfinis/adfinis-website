/**
 * event-page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::event-page.event-page', {
  config: {
    findOne: {
      middlewares: [
        'api::event-page.event-details',
      ],
    },
  },
});
