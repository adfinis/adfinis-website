import { NEWS_SLUGS } from "@/lib/slugs"
import NewsOverview from "@/app/[locale]/(news)/news-overview"
import { Locale } from "@/lib/locale"

export default async function NewsOverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale}/${NEWS_SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }
  return <NewsOverview activeLocale={activeLocale} />
}
