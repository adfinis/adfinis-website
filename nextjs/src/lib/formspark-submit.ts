"use server"
const FORMSPARK_FORM_ID = process.env.FORMSPARK_FORM_ID

export default async function formsparkSubmit(data: Record<string, unknown>) {
  return fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
}
