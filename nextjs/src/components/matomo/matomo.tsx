import { MatomoTagManager } from "@/components/matomo/matomo-tag-manager"

const IS_ENABLED = process.env.MATOMO_ENABLE_TRACKING === "true"
const MATOMO_SRC = process.env.MATOMO_SRC || ""

export const Matomo = () => {
  if (!IS_ENABLED) {
    return null
  }

  return <MatomoTagManager matomoSrc={MATOMO_SRC} />
}
