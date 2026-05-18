import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "node:crypto"
import { TAGS } from "@/lib/strapi"

export const dynamic = "force-dynamic"

const REVALIDATABLE_MODELS = new Set<string>(Object.values(TAGS))

function isAuthorized(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return false

  const header = req.headers.get("authorization") ?? ""
  const expected = `Bearer ${secret}`
  const a = Buffer.from(header)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ revalidated: false, reason: "unauthorized" }, { status: 401 })
  }

  try {
    const payload = (await req.json()) as { event?: string; model?: string }
    const model = payload.model ?? ""
    const revalidated = REVALIDATABLE_MODELS.has(model)
    if (revalidated) {
      revalidateTag(model)
    }

    return NextResponse.json({
      revalidated,
      event: payload.event,
      model,
    })
  } catch {
    return NextResponse.json({ revalidated: false, reason: "invalid-json" }, { status: 400 })
  }
}
