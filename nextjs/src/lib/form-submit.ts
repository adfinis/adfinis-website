const STRAPI = process.env.STRAPI_API || ""

export default async function formSubmit(payload: any) {
  return fetch(`${STRAPI}/forms-betas`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}
