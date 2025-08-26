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
  return {
    title: data.metadata_title,
    description: data.metadata_description,
  }
}

export default function SolutionsPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${SOLUTIONS_SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }

  return <Solutions activeLocale={activeLocale} />
}
