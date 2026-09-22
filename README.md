# Adfinis Website

This repository contains the sources of our company website (adfinis.com). It is a monorepo with two independent apps:

| Folder     | What                            | Node.js   | Dev URL                |
| ---------- | ------------------------------- | --------- | ---------------------- |
| `strapi/`  | Strapi 5 headless CMS (backend) | `22.11.0` | http://localhost:1337  |
| `nextjs/`  | Next.js 16 / React 19 (frontend)| `24.16.0` | http://localhost:3000  |

Content lives in **PostgreSQL**, is edited in Strapi and is fetched by Next.js over the Strapi REST API. Each app has its own `package.json`, `.nvmrc` and `node_modules`, so every command below is run from inside the respective folder.

## Prerequisites

You need three things: Docker (for PostgreSQL), a Node version manager (the two apps need *different* Node versions) and git.

### macOS

```bash
# Docker Desktop (or any other Docker engine you prefer)
brew install --cask docker

# fnm: fast Node version manager, reads the .nvmrc files in this repo
brew install fnm
echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
source ~/.zshrc
```

With `--use-on-cd`, entering `strapi/` or `nextjs/` automatically switches to the right Node version. Prefer [nvm](https://github.com/nvm-sh/nvm)? That works too (`nvm install` / `nvm use` inside each folder).

### Linux

Install Docker with your package manager (`docker.io` on Debian/Ubuntu, `docker` on Fedora/Arch), start the service and add yourself to the `docker` group (`sudo usermod -aG docker $USER`, then log out and in). Install [fnm](https://github.com/Schniz/fnm#installation) or nvm.

## Quick start

```bash
./scripts/setup.sh
```

The script is safe to re-run and never overwrites existing files. It:

1. checks that git, Docker (running) and a Node version manager (fnm or nvm) are available (`./scripts/setup.sh --check` does only this) and tells you how to install what is missing,
2. installs the Node versions pinned in `strapi/.nvmrc` and `nextjs/.nvmrc`,
3. starts the PostgreSQL container (creating it on first run),
4. creates `strapi/.env` and `nextjs/.env.local` with generated secrets, the database settings and a matching `DRAFT_MODE_SECRET`,
5. runs `npm ci` in both apps,
6. seeds Strapi (`npm run seed` in `strapi/`): the five locales, a local admin account (`admin@adfinis.test` / `Adfinis-local-1`, only if no admin exists yet; set `DEFAULT_STRAPI_ADMIN_PASS` to choose another password), a read-only API token (the seed prints it once; `setup.sh` stores it in `nextjs/.env.local`), a placeholder homepage, navigation menu and footer for every locale and a webhook named "Revalidate nextjs cache" (see [Architecture](#architecture)). The seed lives in `strapi/scripts/seed/`, one file per step under `steps/`.

Then start the two apps in separate terminals:

```bash
cd strapi && npm run develop     # http://localhost:1337/admin
cd nextjs && npm run dev         # http://localhost:3000
```

The seed refuses to run unless it looks like a local development setup: `NODE_ENV` must be unset or `development`, `APP_URL` must be unset and the database (`DATABASE_HOST` / `DATABASE_URL`) must be `localhost`. The seeded content is only placeholder text so the site renders; replace it in the Strapi admin. Seeded media points at a logo in `nextjs/public`, so no object storage is needed.

The rest of this section explains each step in case you want to do it by hand or something goes wrong.

## Manual setup

### 1. Database

```bash
docker run -d \
  -p 5432:5432 \
  --name adfinis-website-postgres \
  -e POSTGRES_DB=postgres \
  -e POSTGRES_PASSWORD=supersecret \
  postgres
```

Check that it is running with `docker ps`. The data survives `docker stop`/`docker start`; only `docker rm` deletes it (see [Database management](#database-management)).

### 2. Strapi

```bash
cd strapi
fnm use          # or `nvm use`
npm install
cp .env.example .env
```

Edit `strapi/.env`:

1. **Secrets**: replace every `toBeModified…` / `tobemodified` value with a random string (`openssl rand -base64 24`). `APP_KEYS` takes several comma-separated keys.
2. **Database**: Strapi defaults to SQLite, so point it at the container from step 1. Add:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=supersecret
   ```
3. **Draft mode**: set `DRAFT_MODE_SECRET` (`openssl rand -hex 32`). It must be the same value as in the Next.js env (see step 3), and is what makes "Preview" in the Strapi admin work.
4. **Uploads**: media is stored in a DigitalOcean Space (`DO_SPACE_*`). You can leave the keys empty; Strapi starts fine and everything except uploading media works. Ask a teammate for credentials if you need uploads, and set `DO_SPACE_DIRECTORY` to your own folder so you don't overwrite shared assets.

Then start it:

```bash
npm run develop
```

Strapi is now at http://localhost:1337/admin. On first visit it asks you to create an admin account (local only, pick anything).

> The content-types (pages, sections, components, …) are part of this repository under `strapi/src`. Strapi creates all tables on first start, so you do **not** need to create anything in the Content-Type Builder. Only content and settings are missing, see the next section.

### 3. Seed your local Strapi

A fresh database is empty. Seed it:

```bash
cd strapi && npm run seed
```

Run on its own, the seed prints the API token once; copy it into `nextjs/.env.local` as `STRAPI_API_TOKEN` (`./scripts/setup.sh` does that for you, and nothing else writes env files). To do it by hand in the Strapi admin instead:

1. **Locales**: *Settings → Internationalization*. The frontend supports exactly these five locales; add the missing ones (mind the upper-case region): `en` (default), `en-AU`, `nl`, `de-CH`, `de-DE`.
2. **API access**: create an API token (*Settings → API Tokens*, type *Read-only*) and put it in `nextjs/.env.local` as `STRAPI_API_TOKEN`. Alternatively enable `find` and `findOne` for every content type under *Settings → Users & Permissions plugin → Roles → Public*.
3. **Content**: create and publish a *Homepage*, *Navigation menu* and *Footer* entry per locale. The frontend only shows published entries (`status=published`). It also expects every link URL in the menu and the footer social URLs (LinkedIn, GitHub, YouTube) to be filled in, even though Strapi marks them optional, otherwise the page fails with a `null` `href` error.

### 4. Next.js

Open a second terminal:

```bash
cd nextjs
fnm use          # or `nvm use`
npm install
npm run dev
```

The site is at http://localhost:3000 (`/` is the English homepage, other locales live under `/nl`, `/de-ch`, …).

`nextjs/.env` is committed and holds safe defaults, including `STRAPI_API=http://localhost:1337/api`. **Put your own values in `nextjs/.env.local`** (git-ignored, takes precedence). Things you may want there:

| Variable             | Why                                                                     |
| -------------------- | ----------------------------------------------------------------------- |
| `STRAPI_API_TOKEN`   | Alternative to opening up the Public role (see above)                   |
| `DRAFT_MODE_SECRET`  | Same value as in `strapi/.env`; needed for previews                     |
| `ALTCHA_HMAC_KEY`    | Needed to submit forms (`openssl rand -hex 32`)                         |
| `FORMSPARK_FORM_ID`  | Form submissions; leave empty locally                                   |
| `SENTRY_*`, `MATOMO_*`, `REDDIT_*`, `LINKEDIN_*`, `GOOGLE_ADS_*` | Monitoring/tracking; keep disabled (`*_ENABLE_TRACKING=false`) locally |

Optional: [localias](https://github.com/peterldowns/localias) config in `.localias.yaml` serves the site as `https://www.adfinis.test` (`brew install peterldowns/tap/localias`, then `localias start`).

## Commands

| Folder    | Command                | What                                               |
| --------- | ---------------------- | -------------------------------------------------- |
| `strapi/` | `npm run develop`      | Dev server with auto-reload and admin UI           |
| `strapi/` | `npm run build`        | Build the admin panel (run by CI)                  |
| `strapi/` | `npm run start`        | Production server (no auto-reload)                 |
| `nextjs/` | `npm run dev`          | Dev server                                         |
| `nextjs/` | `npm run build`        | Production build (run by CI)                       |
| `nextjs/` | `npx vitest run`       | Run the unit tests once (`npm test` starts watch mode) |
| `nextjs/` | `npm run lint`         | ESLint                                             |

## Editor

The repo ships `.vscode/settings.json` (works in VS Code and VSCodium): ESLint for both folders, Prettier on save and Tailwind class completion. Install the ESLint, Prettier and Tailwind CSS IntelliSense extensions.

## Workflow

- Branch from `develop` and open pull requests against `develop`. `main` is the release branch.
- CI (`.github/workflows/ci.yml`) runs the Next.js tests and build and the Strapi build on every pull request. Run the same locally before pushing.
- Commit messages follow `type (AW-123): description`; see `CHANGELOG.md` for examples.

## Architecture

- **Strapi** is the CMS and API. Content types are in `strapi/src/api` and reusable components in `strapi/src/components`. Schema changes that need data migrations go in `strapi/database/migrations`.
- **Next.js** (App Router) renders the site from the Strapi API: routing under `nextjs/src/app/[locale]`, Strapi fetch helpers in `nextjs/src/lib/strapi.ts`, page sections in `nextjs/src/components/sections`.
- **PostgreSQL** stores all content. Production and staging read their database settings from `strapi/config/env/`.
- Next.js caches Strapi responses by tag (see `TAGS` in `strapi.ts`). Strapi purges them by calling `POST /api/revalidate` (protected by `Authorization: Bearer <REVALIDATE_SECRET>`) from a webhook on every entry create, update, delete, publish and unpublish. The seed creates that webhook locally as "Revalidate nextjs cache" (*Settings → Webhooks*), pointing at `http://localhost:3000/api/revalidate` with the secret from `nextjs/.env`; override the secret in `nextjs/.env.local` and re-run `./scripts/setup.sh` to sync it.

## Troubleshooting

| Symptom | Fix |
| ------- | --- |
| `Unsupported engine` / weird build errors | Wrong Node version. Run `fnm use` (or `nvm use`) in *that* folder. |
| Strapi starts with SQLite instead of Postgres | `DATABASE_CLIENT=postgres` missing in `strapi/.env`. |
| Strapi: `password authentication failed` / `ECONNREFUSED` | Container not running (`docker ps`), or the `DATABASE_*` values don't match the `docker run` flags. |
| Site shows 404 everywhere; Strapi logs `403` | `STRAPI_API_TOKEN` missing in `nextjs/.env.local` (re-run `./scripts/setup.sh`), or nothing is *published* yet. |
| Site shows a 500 mentioning `href` … `null` | A menu URL or footer social URL is empty in Strapi (see Manual setup, step 3). Restart `npm run dev` afterwards, Next caches Strapi responses. |
| Site shows 404 for one locale | That locale is not created in Strapi or has no published content. Codes are case-sensitive: `en-AU`, not `en-au`. |
| Port 1337 / 3000 / 5432 already in use | Stop the other process, or the old container: `docker ps`. |

## Database management

```bash
docker stop adfinis-website-postgres     # stop (data is kept)
docker start adfinis-website-postgres    # start again
docker rm -f adfinis-website-postgres    # DELETE the container and all local content
```

After `docker rm` run `./scripts/setup.sh` again; it recreates the container and re-seeds.

## License

See [LICENSE](LICENSE).
