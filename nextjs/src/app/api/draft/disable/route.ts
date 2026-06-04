import { draftMode } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET() {
  ;(await draftMode()).disable()
  return new Response(
    "Draft mode disabled. You're seeing the public version again.",
    { headers: { "Cache-Control": "no-store" } },
  )
}
