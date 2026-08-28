import { notFound } from "next/navigation"
import { getLlm } from "@/lib/strapi"

export async function GET() {
  const llm = await getLlm()

  const content = typeof llm?.content === "string" ? llm.content.trim() : ""

  if (!content) {
    notFound()
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
