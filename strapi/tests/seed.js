'use strict';

const TAGS = [
  { name: 'Red Hat', slug: 'red-hat', group: 'partner' },
  { name: 'Switzerland', slug: 'switzerland', group: 'location' },
  { name: 'Kubernetes', slug: 'kubernetes', group: 'solution' },
];

const page = (name) => ({
  internal_name: name,
  metadata_title: name,
  metadata_description: name,
  slug: name.toLowerCase().replace(/ /g, '-'),
});

const carousel = (tags) => ({
  __component: 'sections.filtered-carousel',
  title: 'Related news',
  resource: 'news',
  limit: 3,
  props: { background: 'neutral', padding: 'both-padding' },
  tags,
});

const news = (name, tags) => ({
  ...page(name),
  main_blog: name,
  publication_date: '2026-01-15T09:00:00.000Z',
  tags,
});

const event = (name, tags) => ({
  ...page(name),
  date_event: '2030-06-01',
  time: '09:00',
  address: 'Bern',
  map_embed_html: '<iframe></iframe>',
  tags,
});

const caseStudy = (name, tags) => ({
  ...page(name),
  card_title: name,
  card_subtitle: name,
  intro: name,
  publication_date: '2026-01-15',
  tags,
});

async function seed(strapi) {
  const tag = {};
  for (const data of TAGS) {
    tag[data.slug] = await strapi.documents('api::tag.tag').create({ data });
  }
  const publish = (uid, data) => strapi.documents(uid).create({ data, status: 'published' });

  await publish('api::news-page.news-page', news('News Red Hat', [tag['red-hat']]));
  await publish('api::news-page.news-page', news('News Kubernetes', [tag.kubernetes]));
  await publish('api::news-page.news-page', news('News untagged', []));

  await publish('api::event-page.event-page', {
    ...event('Event Switzerland', [tag.switzerland]),
    sections: [carousel([tag['red-hat'], tag.kubernetes])],
  });
  await publish('api::event-page.event-page', event('Event untagged', []));

  await publish(
    'api::page-case-study.page-case-study',
    caseStudy('Case study Kubernetes', [tag.kubernetes])
  );
  await publish('api::page-case-study.page-case-study', caseStudy('Case study untagged', []));

  await publish('api::page.page', {
    ...page('Page with carousel'),
    sections: [carousel([tag['red-hat'], tag.kubernetes])],
  });

  const { accessKey } = await strapi.service('admin::api-token').create({
    name: 'Tests',
    type: 'read-only',
    lifespan: null,
  });
  return { apiToken: accessKey };
}

module.exports = { seed, TAGS };
