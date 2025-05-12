import Solutions from "@/app/[locale]/(solutions-group)/solutions"
import { Locale } from "@/lib/locale"
import { SOLUTIONS_SLUGS } from "@/lib/slugs"

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
