/**
 * events-overview router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::events-overview.events-overview', {
  config: {
    find: {
      middlewares: [
        'global::populate-sections-with-intro-and-localizations',
      ],
    },
  },
});
