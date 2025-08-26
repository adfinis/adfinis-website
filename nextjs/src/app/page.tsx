import Homepage from "@/app/homepage"
import CookieNotice from "@/components/cookie-notice"
import { Locale } from "@/lib/locale"

export const dynamic = "force-dynamic"

export default async function Page() {
  const activeLocale: { href: string; locale: Locale; isActive: boolean } = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  return (
    <>
      <Homepage activeLocale={activeLocale} />
      <CookieNotice locale="en" />
    </>
  )
}
