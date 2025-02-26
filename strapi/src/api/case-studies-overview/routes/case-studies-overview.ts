/**
 * case-studies-overview router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::case-studies-overview.case-studies-overview', {
  config: {
    find: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});
