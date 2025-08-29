import { Locale } from "@/lib/locale"
import { ReactNode } from "react"
import CookieNotice from "@/components/cookie-notice"

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: Locale }
}) {
  return (
    <>
      {children}
      <CookieNotice locale={locale} />
    </>
  )
}
