import { buildCategorySitemap } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  return buildCategorySitemap({
    endpoint: "event-pages",
    categorySlug: "events",
  })
}
