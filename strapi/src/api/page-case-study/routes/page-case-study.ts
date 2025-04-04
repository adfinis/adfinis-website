/**
 * page-case-study router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page-case-study.page-case-study', {
  config: {
    findOne: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});

