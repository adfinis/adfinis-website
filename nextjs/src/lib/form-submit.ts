import { headers } from "next/headers"
import { strapiFetch } from "./strapi"

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

  return strapiFetch("forms-betas", {
    cache: "no-cache",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}
