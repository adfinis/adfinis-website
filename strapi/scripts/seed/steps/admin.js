'use strict';

const { log } = require('../log');

const DEFAULT_ADMIN_PASSWORD = 'Adfinis-local-1';

const ADMIN = {
  email: 'admin@adfinis.test',
  firstname: 'Local',
  lastname: 'Admin',
  // Override with DEFAULT_STRAPI_ADMIN_PASS (env or strapi/.env); empty/unset falls back to the default.
  password: (process.env.DEFAULT_STRAPI_ADMIN_PASS || '').trim() || DEFAULT_ADMIN_PASSWORD,
};

module.exports = async function seedAdmin(strapi) {
  if ((await strapi.db.query('admin::user').count()) > 0) {
    return log('admin: an admin user already exists, skipping');
  }
  const role = await strapi.service('admin::role').getSuperAdmin();
  await strapi.service('admin::user').create({ ...ADMIN, isActive: true, roles: [role.id] });
  log(
    ADMIN.password === DEFAULT_ADMIN_PASSWORD
      ? `admin: created ${ADMIN.email} / ${DEFAULT_ADMIN_PASSWORD}`
      : `admin: created ${ADMIN.email} (password from DEFAULT_STRAPI_ADMIN_PASS)`
  );
};
