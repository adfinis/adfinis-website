import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"
import { Locale } from "@/lib/locale"

export default function OverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale}/${CASE_STUDIES_SLUGS[locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
