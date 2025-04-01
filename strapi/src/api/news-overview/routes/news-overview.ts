/**
 * news-overview router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::news-overview.news-overview', {
  config: {
    find: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});

