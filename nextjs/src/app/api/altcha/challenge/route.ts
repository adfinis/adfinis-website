import { NextResponse } from "next/server"
import { createAltchaChallenge } from "@/lib/altcha"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const challenge = await createAltchaChallenge()
    return NextResponse.json(challenge, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Failed to create Altcha challenge", error)
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
}
