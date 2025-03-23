import { SLUGS } from "@/app/[locale]/(case-studies)/case-studies-slugs"
import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"

export default function OverviewPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const activeLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
