'use strict';

const { log } = require('../log');

const TOKEN_NAME = 'Local Next.js (seed)';

// The key is only shown once, when the token is created. With SEED_PRINT_TOKEN=1 (set by
// scripts/setup.sh) it is printed as a `SEEDED_API_TOKEN=` line for the caller to store;
// otherwise a human-readable hint is printed. SEED_REGENERATE_TOKEN=1 replaces an existing
// token (invalidating the old key), which setup.sh uses when the key was lost.
module.exports = async function seedApiToken(strapi) {
  const service = strapi.service('admin::api-token');
  const existing = await service.getByName(TOKEN_NAME);
  if (existing && process.env.SEED_REGENERATE_TOKEN !== '1') {
    return log(
      `api token: "${TOKEN_NAME}" already exists (its key can't be shown again). ` +
        'Delete it in the admin or re-run with SEED_REGENERATE_TOKEN=1 to get a new one'
    );
  }
  const token = existing
    ? await service.regenerate(existing.id)
    : await service.create({
        name: TOKEN_NAME,
        description: 'Created by strapi/scripts/seed for local development',
        type: 'read-only',
        lifespan: null,
      });
  if (process.env.SEED_PRINT_TOKEN === '1') {
    console.log(`SEEDED_API_TOKEN=${token.accessKey}`);
  } else {
    log('api token: created a read-only token. Set this in nextjs/.env.local (shown once):');
    log(`STRAPI_API_TOKEN=${token.accessKey}`);
  }
};
