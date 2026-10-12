'use strict';

// Hosts that only ever mean "this machine". Anything else is treated as remote.
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '::1', '[::1]', 'host.docker.internal'];

/** Exits unless this looks like a local development setup. Must run before Strapi loads. */
function assertLocal() {
  const problems = [];
  const client = process.env.DATABASE_CLIENT || 'sqlite';

  // Only a plain development environment is allowed: production, staging, ... all set NODE_ENV.
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && nodeEnv !== 'development') problems.push(`NODE_ENV=${nodeEnv}`);

  // The deployed environments (strapi/config/env/*) are configured through these.
  if (process.env.APP_URL) problems.push('APP_URL is set');

  if (client !== 'sqlite') {
    // DATABASE_URL takes precedence over DATABASE_HOST in strapi/config/database.ts.
    if (process.env.DATABASE_URL) {
      let host = '';
      try {
        host = new URL(process.env.DATABASE_URL).hostname;
      } catch {
        problems.push('DATABASE_URL is not parseable');
      }
      if (host && !LOCAL_HOSTS.includes(host)) problems.push(`DATABASE_URL host is ${host}`);
    }
    const host = process.env.DATABASE_HOST || 'localhost';
    if (!LOCAL_HOSTS.includes(host)) problems.push(`DATABASE_HOST=${host}`);
    if (process.env.DATABASE_SSL === 'true') problems.push('DATABASE_SSL=true');
  }

  if (problems.length > 0) {
    console.error(
      `Refusing to seed: this does not look like a local development setup (${problems.join(', ')}).\n` +
        'This script is for local development databases only.'
    );
    process.exit(1);
  }
}

module.exports = { assertLocal };
