import CookieNotice from "@/components/cookie-notice"
import { Locale } from "@/lib/locale"
import { ReactNode } from "react"

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <>
      {children}
      <CookieNotice locale={(locale as Locale) || "en"} />
    </>
  )
}
