'use strict';

const { log } = require('../log');

const NAME = 'Revalidate nextjs cache';
const URL = 'http://localhost:3000/api/revalidate';
// The "Entry" group in the webhook settings.
const EVENTS = ['entry.create', 'entry.update', 'entry.delete', 'entry.publish', 'entry.unpublish'];

// Next.js caches Strapi responses; nextjs/src/app/api/revalidate/route.ts purges them when this
// webhook fires. The route expects `Authorization: Bearer <REVALIDATE_SECRET>`. scripts/setup.sh
// passes that secret in as SEED_REVALIDATE_SECRET (this script never reads the nextjs env files).
module.exports = async function seedRevalidateWebhook(strapi) {
  const secret = process.env.SEED_REVALIDATE_SECRET;
  if (!secret) {
    return log(
      `webhook: skipped, SEED_REVALIDATE_SECRET is not set (use scripts/setup.sh, or set it to the REVALIDATE_SECRET of nextjs/)`
    );
  }

  const data = {
    name: NAME,
    url: URL,
    headers: { Authorization: `Bearer ${secret}` },
    events: EVENTS,
    isEnabled: true,
  };

  const store = strapi.get('webhookStore');
  const existing = (await store.findWebhooks()).find((w) => w.name === NAME);
  if (!existing) {
    await store.createWebhook(data);
    return log(`webhook: created "${NAME}"`);
  }

  // Keep it in sync, a stale secret would silently break cache invalidation.
  const same =
    existing.url === data.url &&
    existing.headers?.Authorization === data.headers.Authorization &&
    EVENTS.length === existing.events?.length &&
    EVENTS.every((e) => existing.events.includes(e));
  if (same) return log(`webhook: "${NAME}" already up to date`);
  await store.updateWebhook(existing.id, { ...existing, ...data });
  log(`webhook: updated "${NAME}"`);
};
