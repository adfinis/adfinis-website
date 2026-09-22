'use strict';

const { log } = require('../log');
const { LOCALES } = require('./locales');

// Required media fields can't be uploaded without object storage, so register file
// records that point at static assets in nextjs/public (next/image serves them as-is).
async function seedMedia(strapi, { hash, name, alternativeText, ext, mime, url }) {
  const query = strapi.db.query('plugin::upload.file');
  const existing = await query.findOne({ where: { hash } });
  if (existing) return existing;
  const file = await query.create({
    data: { name, alternativeText, hash, ext, mime, size: 1, url, provider: 'local' },
  });
  log(`media: registered placeholder ${name}`);
  return file;
}

function seedLogo(strapi) {
  return seedMedia(strapi, {
    hash: 'seed_logo',
    name: 'logo-1.svg',
    alternativeText: 'Adfinis',
    ext: '.svg',
    mime: 'image/svg+xml',
    url: '/svg/logo/logo-1.svg',
  });
}

function seedHeroBackground(strapi) {
  return seedMedia(strapi, {
    hash: 'seed_hero_background',
    name: 'hero-404.jpg',
    alternativeText: 'Adfinis',
    ext: '.jpg',
    mime: 'image/jpeg',
    url: '/hero-404.jpg',
  });
}

// Hero is a (non-draftAndPublish) collection type, so unlike the single types below we
// identify "already seeded" by internal_name rather than by locale having any entry at all.
// Returns a { [localeCode]: hero } map so the caller can wire the homepage's hero relation.
async function seedHero(strapi, backgroundImage, logo) {
  const docs = strapi.documents('api::hero.hero');
  const heroes = {};
  let documentId;
  for (const { code } of LOCALES) {
    const internal_name = `Homepage hero (${code})`;
    let hero = await docs.findFirst({ locale: code, filters: { internal_name } });
    if (!hero) {
      const data = {
        internal_name,
        name: `homepage-hero-${code.toLowerCase()}`,
        color: { color: 'sapphire' },
        background_image: backgroundImage.id,
        body: `# Welcome (${code})\n\nPlaceholder hero content created by \`npm run seed\`.`,
        cta: { label: 'Contact us', href: `/${code.toLowerCase()}/contact`, size: 'large', variant: 'cta' },
        logo: logo.id,
      };
      hero = documentId
        ? await docs.update({ documentId, locale: code, data })
        : await docs.create({ locale: code, data });
      log(`hero: created ${code}`);
    }
    documentId = hero.documentId;
    heroes[code] = hero;
  }
  return heroes;
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
  const heroBackground = await seedHeroBackground(strapi);
  const heroes = await seedHero(strapi, heroBackground, logo);

  await seedSingleType(strapi, 'api::homepage.homepage', 'homepage', (code) => ({
    metadata_title: `Adfinis (${code})`,
    meta_description: `Local development homepage for locale ${code}.`,
    hero: heroes[code].id,
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
