import Solutions from "@/app/[locale]/(solutions-group)/solutions"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"

export default function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const activeLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }

  return <Solutions activeLocale={activeLocale} />
}
