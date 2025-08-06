import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import SolutionDetail from "@/app/[locale]/(solutions-group)/solution-detail"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import strapi from "@/lib/strapi"
import { normalizeLocale } from "@/lib/normalize-locale"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const url = `solutions-pages/${slug}?locale=${normalizeLocale(locale)}&status=published`
  const data = await strapi(url)
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
