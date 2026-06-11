import { headers } from "next/headers"

const STRAPI = process.env.STRAPI_API || ""
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ""

function stripHostname(referrer: string): string {
  try {
    const url = new URL(referrer)
    return url.pathname + url.search + url.hash
  } catch {
    return referrer
  }
}

export default async function formSubmit(payload: any) {
  const headersList = await headers()
  payload.data.from_url = stripHostname(headersList.get("referer") || "")

  return fetch(`${STRAPI}/forms-betas`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    body: JSON.stringify(payload),
  })
}
