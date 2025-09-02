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
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `/${slugLocale}/${SOLUTIONS_SLUGS[slugLocale]}/${item.slug}`
      return acc
    },
    { [locale]: `/${locale}/${SOLUTIONS_SLUGS[locale]}/${slug}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `/${locale}/${SOLUTIONS_SLUGS[locale]}/${slug}`,
      languages,
    },
  }
}

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${SOLUTIONS_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <SolutionDetail slug={slug} activeLocale={activeLocale} />
}
