/**
 * page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page.page', {
  config: {
    findOne: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});

