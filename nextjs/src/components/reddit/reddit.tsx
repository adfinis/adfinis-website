import { RedditPixel } from "@/components/reddit/reddit-pixel"

const IS_ENABLED = process.env.REDDIT_ENABLE_TRACKING === "true"
const PIXEL_ID = process.env.REDDIT_PIXEL_ID || ""

export const Reddit = () => {
  if (!IS_ENABLED || PIXEL_ID === "") {
    return null
  }

  return <RedditPixel pixelId={PIXEL_ID} />
}
