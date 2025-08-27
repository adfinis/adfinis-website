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
  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function NewsOverviewPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${NEWS_SLUGS[locale.toLowerCase() as Locale]}`,
    locale: locale,
    isActive: true,
  }
  return (
    <NewsOverview activeLocale={activeLocale} searchParams={searchParams} />
  )
}
