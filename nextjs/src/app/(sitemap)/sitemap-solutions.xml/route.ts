import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import { buildCategorySitemap } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  return buildCategorySitemap({
    endpoint: "solutions-pages",
    categorySlug: SOLUTIONS_SLUGS,
  })
}
