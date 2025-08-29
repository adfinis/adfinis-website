import Homepage from "@/app/homepage"
import CookieNotice from "@/components/cookie-notice"
import { Locale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default function Home() {
  const locale = "de-de" as Locale
  const activeLocale = {
    href: `/${locale.toLowerCase()}`,
    locale: locale,
    isActive: true,
  }
  return (
    <>
      <Homepage activeLocale={activeLocale} />
      <CookieNotice locale={locale} />
    </>
  )
}
