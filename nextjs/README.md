This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## End-to-end tests

```bash
npx playwright install chromium # once
npm run test:e2e
```

Playwright builds the site and starts it on port 3100, next to a mock Strapi on port 4310. No real Strapi is contacted.

- `e2e/*.spec.ts` holds the tests. They run at desktop and mobile size.
- `e2e/pages/` holds the page objects. Only they know the `data-testid` values.
- `e2e/fixtures/` holds the JSON the mock Strapi answers with.
- `e2e/mock-strapi.mjs` picks the fixture: the Strapi path, then the tag slugs, then `past` or `undated`. `event-pages/?…[$in][0]=red-hat` reads `event-pages.red-hat.json`.

To add a test, add the fixtures its page asks for, give a page object the locators, and write the spec against the page object. A request without a fixture answers 404 and prints `mock-strapi: no fixture …` in the test output.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
