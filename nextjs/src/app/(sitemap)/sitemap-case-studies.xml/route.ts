import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { buildCategorySitemap } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  return buildCategorySitemap({
    endpoint: "page-case-studies",
    categorySlug: CASE_STUDIES_SLUGS,
  })
}
