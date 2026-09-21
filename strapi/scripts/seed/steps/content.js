'use strict';

const { log } = require('../log');
const { LOCALES } = require('./locales');

// Logos are required media. We can't upload without object storage, so register a
// file record that points at a logo in nextjs/public (next/image serves it as-is).
async function seedLogo(strapi) {
  const hash = 'seed_logo';
  const query = strapi.db.query('plugin::upload.file');
  const existing = await query.findOne({ where: { hash } });
  if (existing) return existing;
  const file = await query.create({
    data: {
      name: 'logo-1.svg',
      alternativeText: 'Adfinis',
      hash,
      ext: '.svg',
      mime: 'image/svg+xml',
      size: 1,
      url: '/svg/logo/logo-1.svg',
      provider: 'local',
    },
  });
  log('media: registered placeholder logo');
  return file;
}

// Publishes one entry per locale for a single type, skipping locales that already have one.
async function seedSingleType(strapi, uid, label, dataFor) {
  const docs = strapi.documents(uid);
  for (const { code } of LOCALES) {
    if (await docs.findFirst({ locale: code, status: 'published' })) continue;
    const base = await docs.findFirst({ locale: 'en' });
    const data = dataFor(code);
    if (base) {
      await docs.update({ documentId: base.documentId, locale: code, data, status: 'published' });
    } else {
      await docs.create({ locale: code, data, status: 'published' });
    }
    log(`${label}: published ${code}`);
  }
}

// The frontend needs more than the schema requires: every menu url and the three footer
// social urls must be filled in, or the page fails with a null `href`.
module.exports = async function seedContent(strapi) {
  const logo = await seedLogo(strapi);

  await seedSingleType(strapi, 'api::homepage.homepage', 'homepage', (code) => ({
    metadata_title: `Adfinis (${code})`,
    meta_description: `Local development homepage for locale ${code}.`,
    intro: `# Welcome (${code})\n\nThis is placeholder content created by \`npm run seed\`. Edit it in the Strapi admin.`,
  }));

  await seedSingleType(strapi, 'api::navigation-menu.navigation-menu', 'navigation', (code) => ({
    title: `Navigation menu (${code})`,
    logo_desktop: logo.id,
    logo_mobile: logo.id,
    cta: { label: 'Contact', href: `/${code.toLowerCase()}/contact`, size: 'small', variant: 'cta' },
    section: [
      {
        title: 'Solutions',
        url: `/${code.toLowerCase()}`,
        menu_segment: [
          {
            title: 'Example segment',
            url: `/${code.toLowerCase()}`,
            items: [{ title: 'Example link', url: `/${code.toLowerCase()}` }],
          },
        ],
      },
      { title: 'About', url: `/${code.toLowerCase()}` },
    ],
  }));

  await seedSingleType(strapi, 'api::footer.footer', 'footer', (code) => ({
    description: `Placeholder footer (${code}).`,
    linkedin_url: 'https://www.linkedin.com/company/adfinis',
    github_url: 'https://github.com/adfinis',
    youtube_url: 'https://www.youtube.com/@adfinis',
  }));
};
