/**
 * page-case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page-case-study.page-case-study', ({ strapi }) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.documents('api::page-case-study.page-case-study').findFirst({
      filters: { slug },
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
