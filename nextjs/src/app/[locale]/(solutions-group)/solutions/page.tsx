import Solutions from "@/app/[locale]/(solutions-group)/solutions"
import { Locale } from "@/lib/locale"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import { Metadata } from "next"
import { getSolutionsOverview } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
  if (!["en", "en-au"].includes(locale)) {
    return notFound()
  }

  const data = await getSolutionsOverview(locale)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `${ABSOLUTE_URL}/${slugLocale}/${SOLUTIONS_SLUGS[slugLocale]}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/${SOLUTIONS_SLUGS[locale]}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/${SOLUTIONS_SLUGS[locale]}`,
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
