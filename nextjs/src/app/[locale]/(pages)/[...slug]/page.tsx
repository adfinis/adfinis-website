import { getPage } from "@/lib/strapi"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import PageDetail from "@/app/[locale]/(pages)/page-detail"

export async function generateMetadata(props: {
  params: Promise<{
    locale: string
    slug: string[]
  }>
}): Promise<Metadata> {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale, slug } = params

  const path = slug.join("/")
  const data = await getPage(locale, path)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase()
      acc[item.locale] = `${ABSOLUTE_URL}/${slugLocale}/${item.slug}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/${slug}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({ data, locale, path, languages })
}

export default async function LandingPage(props: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale, slug } = params

  const URI_PATH = slug.join("/")
  const activeLocale = {
    href: `/${locale}/${URI_PATH}`,
    locale: locale,
    isActive: true,
  }
  const data = await getPage(locale, URI_PATH)
  return <PageDetail data={data} activeLocale={activeLocale} />
}
