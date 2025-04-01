/**
 * news-page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::news-page.news-page', {
  config: {
    findOne: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});
