import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { timingSafeEqual } from "node:crypto"

export const dynamic = "force-dynamic"

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export async function GET(req: NextRequest) {
  const secret = process.env.DRAFT_MODE_SECRET ?? ""

  const { searchParams } = new URL(req.url)
  const provided = searchParams.get("secret") ?? ""
  const path = searchParams.get("path") ?? "/"
  const status = searchParams.get("status")

  if (!safeEqual(provided, secret)) {
    return new Response("Invalid token", { status: 401 })
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response("Invalid path", { status: 400 })
  }

  const draft = await draftMode()
  if (status === "published") {
    draft.disable()
  } else {
    draft.enable()
  }

  redirect(path)
}
