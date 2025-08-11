import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"
import { Locale } from "@/lib/locale"
import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import { Metadata } from "next"
import { getCaseStudiesOverview } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getCaseStudiesOverview(locale)
  return {
    title: data.metadata_title,
    description: data.meta_description, // TODO refactor to metadata
  }
}

export default function OverviewPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${CASE_STUDIES_SLUGS[locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
