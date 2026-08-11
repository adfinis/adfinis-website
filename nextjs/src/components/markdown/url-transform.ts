import { defaultUrlTransform } from "react-markdown"

/**
 * @description Shared `urlTransform` for the markdown components.
 *
 * - Preserves `tel:` links (react-markdown's default sanitizer would otherwise
 *   strip them).
 * - Upgrades `http://` to `https://`. This makes bare autolinks default to
 *   https: remark-gfm expands a literal like `www.adfinis.com` into
 *   `http://www.adfinis.com` per the GFM spec, and we want those served over
 *   https.
 */
export const markdownUrlTransform = (url: string): string => {
  if (url.startsWith("tel:")) {
    return url
  }

  return defaultUrlTransform(
    url.startsWith("http://") ? `https://${url.slice("http://".length)}` : url,
  )
}
