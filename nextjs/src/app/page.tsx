import Homepage from "@/app/homepage"
import CookieNotice from "@/components/cookie-notice"

export const dynamic = "force-dynamic"

export default async function Page() {
  const activeLocale = {
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
