'use strict';

const fs = require('fs');
const path = require('path');

const databaseFile = path.resolve(__dirname, '..', '.tmp', 'test.db');
const missingEnvFile = path.join(__dirname, 'tests-do-not-read-dotenv');

process.env.NODE_ENV = 'test';
process.env.ENV_PATH = missingEnvFile;
process.env.DATABASE_FILENAME = databaseFile;
process.env.HOST = '127.0.0.1';
process.env.PORT = '0';
process.env.APP_KEYS = 'testKeyOne,testKeyTwo';
process.env.API_TOKEN_SALT = 'test-api-token-salt';
process.env.ADMIN_JWT_SECRET = 'test-admin-jwt-secret';
process.env.TRANSFER_TOKEN_SALT = 'test-transfer-token-salt';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.STRAPI_TELEMETRY_DISABLED = 'true';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { seed } = require('./seed');

jest.setTimeout(30000);

async function setupStrapi() {
  fs.rmSync(databaseFile, { force: true });
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  await app.start();
  return seed(app);
}

async function cleanupStrapi() {
  await strapi.destroy();
  fs.rmSync(databaseFile, { force: true });
}

module.exports = { setupStrapi, cleanupStrapi };
