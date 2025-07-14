import Solutions from "@/app/[locale]/(solutions-group)/solutions"
import { Locale } from "@/lib/locale"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"
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
  const url = `solutions-overview?locale=${locale}&status=published`
  const data = await strapi(url)
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
    href: `/${locale}/${SOLUTIONS_SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }

  return <Solutions activeLocale={activeLocale} />
}
