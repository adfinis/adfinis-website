/**
 * event-page controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event-page.event-page', ({strapi}) => ({
  async findOne(ctx) {
    const { id: param } = ctx.params;
    const { byDocumentId, ...query } = ctx.query;

    const filters = byDocumentId === 'true' ? { documentId: param } : { slug: param };

    const entity = await strapi.documents('api::event-page.event-page').findFirst({
      filters,
      ...query,
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
