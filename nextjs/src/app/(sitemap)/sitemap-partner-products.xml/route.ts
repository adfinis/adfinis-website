import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import { buildCategorySitemap } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  return buildCategorySitemap({
    endpoint: "page-partner-and-products",
    categorySlug: PARTNER_PRODUCTS_SLUGS,
    includeIndex: false,
  })
}
