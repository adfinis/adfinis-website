import { NEWS_SLUGS } from "@/lib/slugs"
import NewsOverview from "@/app/[locale]/(news)/news-overview"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import strapi from "@/lib/strapi"
import { normalizeLocale } from "@/lib/normalize-locale"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const url = `news-overview?locale=${normalizeLocale(locale)}&status=published`
  const data = await strapi(url)
  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function NewsOverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${NEWS_SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }
  return <NewsOverview activeLocale={activeLocale} />
}
