// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import { dataCollection } from "@/lib/sentry-data-collection"

Sentry.init({
  // Must be NEXT_PUBLIC_ so Next.js inlines it into the browser bundle at build time
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Keep the restrictive v10 (sendDefaultPii: false) data collection
  dataCollection,

  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
