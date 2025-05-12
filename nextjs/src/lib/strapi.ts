import { notFound } from "next/navigation"
const STRAPI = process.env.STRAPI_API || ""

export default async function strapi(query: string) {
  const page = await fetch(`${STRAPI}/${query}`, {
    cache: "no-cache",
  })
  if (page && page.status === 404) {
    return notFound()
  }
  const { data } = await page.json()
  return data
}
export async function strapiWithoutRedirect(query: string) {
  const page = await fetch(`${STRAPI}/${query}`, {
    cache: "no-cache",
  })
  const { data } = await page.json()
  return data
}
