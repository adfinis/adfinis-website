import { NEWS_SLUGS } from "@/lib/slugs"
import NewsDetail from "@/app/[locale]/(news)/news-detail"
import { Locale } from "@/lib/locale"

export default async function NewsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${NEWS_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <NewsDetail activeLocale={activeLocale} slug={slug} />
}
