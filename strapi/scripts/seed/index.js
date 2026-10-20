'use strict';

/**
 * Seeds a LOCAL Strapi database with what the frontend needs to render: locales, an admin
 * account, a read-only API token, a cache-revalidation webhook and placeholder content.
 * Run with `npm run seed` (or via `scripts/setup.sh` in the repo root).
 *
 * - Idempotent: anything that already exists is left alone.
 * - Local only: see guard.js.
 * - Never writes env files: the API token is printed (see steps/api-token.js) and
 *   scripts/setup.sh stores it. setup.sh also passes SEED_REVALIDATE_SECRET.
 *
 * To add a step: create steps/<name>.js exporting `async (strapi) => {}` and add it to STEPS.
 */

const path = require('path');

// Load strapi/.env up front so the guard and the steps see it too (real environment
// variables still win, same as when Strapi loads it).
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { assertLocal } = require('./guard');

// Order matters: locales before content, content before the webhook (so seeding
// the content doesn't fire it).
const STEPS = [
  require('./steps/admin'),
  require('./steps/locales'),
  require('./steps/content'),
  require('./steps/webhook'),
  require('./steps/api-token'),
];

async function main() {
  assertLocal();
  console.log('Seeding local Strapi database...');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  try {
    for (const step of STEPS) await step(app);
  } finally {
    await app.destroy();
  }
  console.log('Done.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
