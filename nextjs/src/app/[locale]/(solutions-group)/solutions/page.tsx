import Solutions from "@/app/[locale]/(solutions-group)/solutions"
import { Locale } from "@/lib/locale"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import { Metadata } from "next"
import { getSolutionsOverview } from "@/lib/strapi"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  const data = await getSolutionsOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] = `/${slugLocale}/${SOLUTIONS_SLUGS[slugLocale]}`
      return acc
    },
    { [locale]: `/${locale}/${SOLUTIONS_SLUGS[locale]}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `/${locale}/${SOLUTIONS_SLUGS[locale]}`,
      languages,
    },
  }
}

export default function SolutionsPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${SOLUTIONS_SLUGS[locale.toLowerCase() as Locale]}`,
    locale: locale,
    isActive: true,
  }

  return <Solutions activeLocale={activeLocale} />
}
