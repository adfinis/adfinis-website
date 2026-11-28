import { defineConfig, devices } from "@playwright/test"

const NEXT_PORT = 3100
const STRAPI_PORT = 4310
const STRAPI_URL = `http://127.0.0.1:${STRAPI_PORT}`

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${NEXT_PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: [
    {
      command: "node e2e/mock-strapi.mjs",
      url: `${STRAPI_URL}/tags`,
      env: { PORT: String(STRAPI_PORT) },
    },
    {
      // Next.js keeps Strapi answers for an hour, across builds too. Without
      // the rm, an edited fixture would not show up.
      command: `rm -rf .next/cache/fetch-cache && next build && next start --port ${NEXT_PORT}`,
      url: `http://127.0.0.1:${NEXT_PORT}/robots.txt`,
      timeout: 300_000,
      env: {
        STRAPI_API: STRAPI_URL,
        STRAPI_API_TOKEN: "",
        ABSOLUTE_URL: `http://127.0.0.1:${NEXT_PORT}`,
        WWW_REDIRECT: "false",
        BASIC_AUTH_USER: "",
        BASIC_AUTH_PASSWORD: "",
        SENTRY_DSN: "",
        NEXT_PUBLIC_SENTRY_DSN: "",
        MATOMO_ENABLE_TRACKING: "false",
        REDDIT_ENABLE_TRACKING: "false",
        LINKEDIN_ENABLE_TRACKING: "false",
      },
    },
  ],
})
