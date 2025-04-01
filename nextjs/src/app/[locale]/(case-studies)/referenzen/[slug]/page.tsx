import { SLUGS } from "@/app/[locale]/(case-studies)/case-studies-slugs"
import CaseStudyDetailPage from "@/app/[locale]/(case-studies)/case-study-detail-page"

export default async function DetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  return <CaseStudyDetailPage slug={slug} activeLocale={activeLocale} />
}
