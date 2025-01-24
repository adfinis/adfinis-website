/**
 * solutions-overview router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::solutions-overview.solutions-overview', {
  config: {
    find: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});
