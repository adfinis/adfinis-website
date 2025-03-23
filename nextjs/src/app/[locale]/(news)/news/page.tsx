import { NEWS_SLUGS } from "@/app/[locale]/(news)/news-slugs"
import NewsOverview from "@/app/[locale]/(news)/news-overview"

export default async function NewsOverviewPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const activeLocale = {
    href: `/${locale}/${NEWS_SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }
  return <NewsOverview activeLocale={activeLocale} />
}
