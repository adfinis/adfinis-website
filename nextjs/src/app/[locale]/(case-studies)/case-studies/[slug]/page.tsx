import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudyDetailPage from "@/app/[locale]/(case-studies)/case-study-detail-page"
import { Locale } from "@/lib/locale"

export default async function DetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${CASE_STUDIES_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  return <CaseStudyDetailPage slug={slug} activeLocale={activeLocale} />
}
