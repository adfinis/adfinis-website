'use strict';

const { log } = require('../log');

// The five locales the frontend supports (nextjs/src/lib/locale.ts). Mind the upper-case region.
const LOCALES = [
  { code: 'en', name: 'English (en)' },
  { code: 'en-AU', name: 'English (Australia) (en-AU)' },
  { code: 'nl', name: 'Dutch (nl)' },
  { code: 'de-CH', name: 'German (Switzerland) (de-CH)' },
  { code: 'de-DE', name: 'German (Germany) (de-DE)' },
];

async function seedLocales(strapi) {
  const service = strapi.plugin('i18n').service('locales');
  for (const { code, name } of LOCALES) {
    if (await service.findByCode(code)) continue;
    await service.create({ code, name, isDefault: code === 'en' });
    log(`locale: added ${code}`);
  }
}

module.exports = seedLocales;
module.exports.LOCALES = LOCALES;
