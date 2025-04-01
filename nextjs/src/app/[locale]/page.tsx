import Homepage from "@/app/homepage"

export const dynamic = "force-dynamic"

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const activeLocale = {
    href: `/${locale}`,
    locale: locale,
    isActive: true,
  }
  return <Homepage activeLocale={activeLocale} />
}
