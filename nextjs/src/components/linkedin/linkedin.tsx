import { InsightTag } from "@/components/linkedin/insight-tag"

const IS_ENABLED = process.env.LINKEDIN_ENABLE_TRACKING === "true"
const PARTNER_ID = process.env.LINKEDIN_PARTNER_ID || ""

export const LinkedIn = () => {
  if (!IS_ENABLED || PARTNER_ID === "") {
    return null
  }

  return <InsightTag partnerId={PARTNER_ID} />
}
