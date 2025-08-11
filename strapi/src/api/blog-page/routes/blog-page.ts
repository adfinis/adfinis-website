/**
 * blog-page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog-page.blog-page', {
  config: {
    findOne: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});
