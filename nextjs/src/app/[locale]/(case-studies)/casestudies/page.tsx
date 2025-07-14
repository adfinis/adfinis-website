import { CASE_STUDIES_SLUGS } from "@/lib/slugs"
import CaseStudiesOverviewPage from "@/app/[locale]/(case-studies)/case-studies-overview-page"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import strapi from "@/lib/strapi"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const url = `case-studies-overview?locale=${locale}&status=published`
  const data = await strapi(url)
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
    href: `/${locale}/${CASE_STUDIES_SLUGS[locale]}`,
    locale,
    isActive: true,
  }
  return <CaseStudiesOverviewPage activeLocale={activeLocale} />
}
