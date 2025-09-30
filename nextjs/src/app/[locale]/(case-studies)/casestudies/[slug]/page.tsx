import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudyDetailPage from "@/app/[locale]/(case-studies)/case-study-detail-page"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getCaseStudy } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  if (!["nl"].includes(locale)) {
    return notFound()
  }

  const data = await getCaseStudy(locale, slug)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `${ABSOLUTE_URL}/${slugLocale}/${CASE_STUDIES_SLUGS[slugLocale]}/${item.slug}`
      return acc
    },
    {
      [locale]: `${ABSOLUTE_URL}/${locale}/${CASE_STUDIES_SLUGS[locale]}/${slug}`,
    },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/${CASE_STUDIES_SLUGS[locale]}/${slug}`,
      languages,
    },
  }
}

export default async function DetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${CASE_STUDIES_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  return <CaseStudyDetailPage slug={slug} activeLocale={activeLocale} />
}
