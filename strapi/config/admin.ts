import { buildPreviewUrl } from "../src/utils/build-preview-url"

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL'),
      async handler(uid, { documentId, locale }) {
        const clientUrl = env('CLIENT_URL')
        const secret = env('DRAFT_MODE_SECRET')
        if (!clientUrl || !secret) return null

        const path = await buildPreviewUrl(strapi, uid, documentId, locale)
        if (!path) return null

        const url = new URL('/api/draft/enable', clientUrl)
        url.searchParams.set('secret', secret)
        url.searchParams.set('path', path)
        return url.href
      },
    },
  },
});
