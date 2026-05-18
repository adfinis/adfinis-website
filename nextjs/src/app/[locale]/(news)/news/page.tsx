import { NEWS_SLUGS } from "@/lib/slugs"
import NewsOverview from "@/app/[locale]/(news)/news-overview"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getNewsOverview } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  if (!["de-de", "de-ch", "en", "en-au"].includes(locale)) {
    return notFound()
  }

  const data = await getNewsOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `${ABSOLUTE_URL}/${slugLocale}/${NEWS_SLUGS[slugLocale]}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/${NEWS_SLUGS[locale]}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({
    data,
    locale,
    path: NEWS_SLUGS[locale],
    languages,
  })
}

export default async function NewsOverviewPage(props: {
  params: Promise<{ locale: Locale }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const params = await props.params

  const { locale } = params

  const activeLocale = {
    href: `/${locale.toLowerCase()}/${NEWS_SLUGS[locale.toLowerCase() as Locale]}`,
    locale: locale,
    isActive: true,
  }
  return (
    <NewsOverview activeLocale={activeLocale} searchParams={searchParams} />
  )
}
