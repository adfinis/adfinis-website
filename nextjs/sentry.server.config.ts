// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import { dataCollection } from "@/lib/sentry-data-collection"
import { nodeProfilingIntegration } from "@sentry/profiling-node"

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [nodeProfilingIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,

  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",

  // Keep the restrictive v10 (sendDefaultPii: false) data collection
  dataCollection,

  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,
})
