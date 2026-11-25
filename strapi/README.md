# 🚀 Getting started with Strapi

Strapi comes with a full-featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

### `test`

Runs the API tests in `tests/` with Jest and Supertest, as in the [Strapi testing guide](https://docs.strapi.io/cms/testing).

```
npm run test
```

- The tests start their own Strapi on a throwaway SQLite file, `.tmp/test.db`. They do not read `.env` and do not use your database or port 1337.
- `tests/strapi.js` compiles the TypeScript to `dist`, starts Strapi and runs `tests/seed.js`.
- To add a test: add the documents it needs to `tests/seed.js`, then add an `it(...)` to `tests/tags.test.js` that sends the same request as `nextjs/src/lib/strapi.ts`.
- For a new test file, copy the `beforeAll` and `afterAll` from `tests/tags.test.js`.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

docker run -d -p 5432:5432 --name adfinis-postgres -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=supersecret postgres

