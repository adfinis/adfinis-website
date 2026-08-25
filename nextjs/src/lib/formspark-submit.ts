"use server"

const FORMSPARK_FORM_ID = process.env.FORMSPARK_FORM_ID

export default async function formsparkSubmit(data: Record<string, unknown>) {
  const res = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable body>")
    console.error(
      `Formspark submission failed (type=${data.type}): ${res.status} ${res.statusText} — ${body}`,
    )
    throw new Error(`formspark responded with ${res.status}`, {
      cause: { status: res.status, body },
    })
  }
  return res
}
