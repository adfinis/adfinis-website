import { buildCategorySitemap, buildHomepageEntries } from "@/lib/sitemap"

export const dynamic = "force-dynamic"

export async function GET() {
  return buildCategorySitemap({
    endpoint: "pages",
    includeIndex: false,
    extraEntries: buildHomepageEntries(),
  })
}
