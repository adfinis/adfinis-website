import { Locale } from "@/lib/locale"
import { ReactNode } from "react"
import dynamic from "next/dynamic"

const CookieNotice = dynamic(() => import("@/components/cookie-notice"), {
  ssr: false,
})

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
      <CookieNotice locale={locale || "en"} />
    </>
  )
}
