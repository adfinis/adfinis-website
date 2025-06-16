/**
 * page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.documents('api::page.page').findFirst({
      filters: {
        slug: `/${slug}`
      },
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));

