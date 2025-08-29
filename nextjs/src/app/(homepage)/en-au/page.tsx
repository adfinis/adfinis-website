import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"

export const dynamic = "force-dynamic"

export default function Home() {
  const locale = "en-au" as Locale
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
