import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"

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
