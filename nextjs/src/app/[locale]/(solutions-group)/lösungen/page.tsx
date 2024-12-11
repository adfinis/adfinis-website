import Solutions from "@/app/[locale]/(solutions-group)/solutions"

export default function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = {
    href: `/${locale}/lösungen`,
    locale: locale,
    isActive: true,
  }
  return <Solutions activeLocale={currentLocale} />
}
