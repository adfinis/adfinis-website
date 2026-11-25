'use strict';

const request = require('supertest');
const { setupStrapi, cleanupStrapi } = require('./strapi');
const { TAGS } = require('./seed');

let apiToken;

beforeAll(async () => {
  ({ apiToken } = await setupStrapi());
});

afterAll(async () => {
  await cleanupStrapi();
});

const get = (path) =>
  request(strapi.server.httpServer).get(`/api/${path}`).set('Authorization', `Bearer ${apiToken}`);

const tagFilter = (...slugs) =>
  slugs.map((slug, index) => `&filters[tags][slug][$in][${index}]=${slug}`).join('');

const newsGrid =
  'news-pages?locale=en&populate=hero.background_image&populate=categories&populate=tags&sort[0]=publication_date:desc&sort[1]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=12&status=published';
const eventCards =
  'event-pages/?locale=en&populate=card_image&populate=hero.background_image&filters[is_past_event][$eq]=false&filters[$or][0][date_event_end][$gte]=2026-01-01&filters[$or][1][$and][0][date_event_end][$null]=true&filters[$or][1][$and][1][date_event][$gte]=2026-01-01&status=published&sort=date_event:asc&pagination[pageSize]=100';
const caseStudiesGrid =
  'page-case-studies?locale=en&populate=hero.background_image&populate=client_image&sort=publication_date:desc&pagination[pageSize]=100&status=published';

it('lists the tags with name, slug and group', async () => {
  const { body } = await get('tags?locale=en&sort=name:asc&pagination[pageSize]=100').expect(200);

  expect(body.data.map(({ name, slug, group }) => ({ name, slug, group }))).toEqual(
    [...TAGS].sort((a, b) => a.name.localeCompare(b.name))
  );
});

it.each([
  ['news by one tag', newsGrid, ['red-hat'], ['news-red-hat']],
  ['news by either of two tags', newsGrid, ['red-hat', 'kubernetes'], ['news-kubernetes', 'news-red-hat']],
  ['events by one tag', eventCards, ['switzerland'], ['event-switzerland']],
  ['case studies by one tag', caseStudiesGrid, ['kubernetes'], ['case-study-kubernetes']],
])('filters %s', async (_name, path, slugs, expected) => {
  const { body } = await get(path + tagFilter(...slugs)).expect(200);

  expect(body.data.map((item) => item.slug).sort()).toEqual(expected);
});

it.each(['pages/page-with-carousel', 'event-pages/event-switzerland'])(
  'returns the filtered carousel with its tags on %s',
  async (path) => {
    const { body } = await get(`${path}?locale=en&status=published`).expect(200);

    expect(body.data.sections).toEqual([
      expect.objectContaining({
        __component: 'sections.filtered-carousel',
        title: 'Related news',
        resource: 'news',
        limit: 3,
        props: expect.objectContaining({ background: 'neutral', padding: 'both-padding' }),
        tags: [
          expect.objectContaining({ slug: 'red-hat', group: 'partner' }),
          expect.objectContaining({ slug: 'kubernetes', group: 'solution' }),
        ],
      }),
    ]);
  }
);
