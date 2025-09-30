import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"
import { Locale } from "@/lib/locale"
import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { Metadata } from "next"
import { getCaseStudiesOverview } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  if (!["en", "en-au"].includes(locale)) {
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

  return {
    title: data.metadata_title,
    description: data.meta_description, // TODO refactor
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/${CASE_STUDIES_SLUGS[locale]}`,
      languages,
    },
  }
}

export default function OverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${CASE_STUDIES_SLUGS[locale.toLowerCase() as Locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
