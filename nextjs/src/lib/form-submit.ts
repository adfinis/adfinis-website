import { headers } from "next/headers"

const STRAPI = process.env.STRAPI_API || ""

function stripHostname(referrer: string): string {
  try {
    const url = new URL(referrer)
    return url.pathname + url.search + url.hash
  } catch {
    return referrer
  }
}

export default async function formSubmit(payload: any) {
  const headersList = headers()
  payload.data.from_url = stripHostname(headersList.get("referer") || "")

  return fetch(`${STRAPI}/forms-betas`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}
