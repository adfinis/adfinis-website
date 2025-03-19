import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import SolutionDetail from "@/app/[locale]/(solutions-group)/solution-detail"

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <SolutionDetail slug={slug} activeLocale={activeLocale} />
}
