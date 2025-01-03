/**
 * page-partner-and-product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page-partner-and-product.page-partner-and-product', ({ strapi }) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.documents('api::page-partner-and-product.page-partner-and-product').findFirst({
      filters: { slug },
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
