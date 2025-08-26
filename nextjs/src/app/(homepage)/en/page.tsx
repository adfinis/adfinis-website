import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default function Home() {
  const locale = "en" as Locale
  const activeLocale = {
    href: `/${locale.toLowerCase()}`,
    locale: locale,
    isActive: true,
  }
  return <Homepage activeLocale={activeLocale} />
}
