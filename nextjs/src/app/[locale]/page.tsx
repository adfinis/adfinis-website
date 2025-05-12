import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default function Home({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const activeLocale = {
    href: `/${locale}`,
    locale: locale,
    isActive: true,
  }
  return <Homepage activeLocale={activeLocale} />
}
