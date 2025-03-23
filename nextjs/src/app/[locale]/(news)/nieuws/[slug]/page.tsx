import { NEWS_SLUGS } from "@/app/[locale]/(news)/news-slugs"
import NewsDetail from "@/app/[locale]/(news)/news-detail"

export default async function NewsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${NEWS_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <NewsDetail activeLocale={activeLocale} slug={slug} />
}
