/**
 * page-case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::page-case-study.page-case-study', ({ strapi }) => ({
  async findOne(ctx) {
    const { id: param } = ctx.params;
    const { byDocumentId, ...query } = ctx.query;

    const filters = byDocumentId === 'true' ? { documentId: param } : { slug: param };

    const entity = await strapi.documents('api::page-case-study.page-case-study').findFirst({
      filters,
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
