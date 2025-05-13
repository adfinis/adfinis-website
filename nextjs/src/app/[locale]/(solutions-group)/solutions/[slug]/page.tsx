import { SOLUTIONS_SLUGS } from "@/lib/slugs"
import SolutionDetail from "@/app/[locale]/(solutions-group)/solution-detail"
import { Locale } from "@/lib/locale"

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string }
}) {
  const activeLocale = {
    href: `/${locale}/${SOLUTIONS_SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <SolutionDetail slug={slug} activeLocale={activeLocale} />
}
