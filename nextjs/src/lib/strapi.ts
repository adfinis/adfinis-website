const STRAPI = process.env.STRAPI_API || ""

export default function strapi(query: string) {
  return fetch(`${STRAPI}/${query}`, {
    cache: "no-cache",
  })
}
