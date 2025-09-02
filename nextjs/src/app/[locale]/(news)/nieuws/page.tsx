import { NEWS_SLUGS } from "@/lib/slugs"
import NewsOverview from "@/app/[locale]/(news)/news-overview"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getNewsOverview } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getNewsOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] = `/${slugLocale}/${NEWS_SLUGS[slugLocale]}`
      return acc
    },
    { [locale]: `/${locale}/${NEWS_SLUGS[locale]}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `/${locale}/${NEWS_SLUGS[locale]}`,
      languages,
    },
  }
}

export default async function NewsOverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${NEWS_SLUGS[locale.toLowerCase() as Locale]}`,
    locale: locale,
    isActive: true,
  }
  return <NewsOverview activeLocale={activeLocale} />
}
