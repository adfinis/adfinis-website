import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudyDetailPage from "@/app/[locale]/(case-studies)/case-study-detail-page"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getCaseStudy } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getCaseStudy(locale, slug)
  return {
    title: data.metadata_title,
    description: data.metadata_title,
  }
}

export default async function DetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${CASE_STUDIES_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  return <CaseStudyDetailPage slug={slug} activeLocale={activeLocale} />
}
