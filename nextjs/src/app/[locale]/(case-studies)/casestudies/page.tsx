import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getCaseStudiesOverview } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"

export async function generateMetadata(props: {
  params: Promise<{
    locale: string
    slug: string
  }>
}): Promise<Metadata> {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale } = params

  if (!["nl"].includes(locale)) {
    return notFound()
  }

  const data = await getCaseStudiesOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `${ABSOLUTE_URL}/${slugLocale}/${CASE_STUDIES_SLUGS[slugLocale]}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/${CASE_STUDIES_SLUGS[locale]}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({
    data,
    locale,
    path: CASE_STUDIES_SLUGS[locale],
    languages,
  })
}

export default async function OverviewPage(props: {
  params: Promise<{ locale: string }>
}) {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale } = params

  const activeLocale = {
    href: `/${locale.toLowerCase()}/${CASE_STUDIES_SLUGS[locale.toLowerCase() as Locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
