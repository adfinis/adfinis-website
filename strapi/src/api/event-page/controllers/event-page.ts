/**
 * event-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event-page.event-page', ({strapi}) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.documents('api::event-page.event-page').findFirst({
      filters: { slug },
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
