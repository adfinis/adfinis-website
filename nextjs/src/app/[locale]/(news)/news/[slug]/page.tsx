import { NEWS_SLUGS } from "@/lib/slugs"
import NewsDetail from "@/app/[locale]/(news)/news-detail"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getNewsPage } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getNewsPage(locale, slug)

  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function NewsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${NEWS_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <NewsDetail activeLocale={activeLocale} slug={slug} />
}
