import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import SolutionDetail from "@/app/[locale]/(solutions-group)/solution-detail"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getSolutionPage } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getSolutionPage(locale, slug)

  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${SOLUTIONS_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <SolutionDetail slug={slug} activeLocale={activeLocale} />
}
