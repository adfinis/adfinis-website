import { Locale } from "@/lib/locale"
import { ReactNode } from "react"
import CookieNotice from "@/components/cookie-notice"

export default async function Layout(props: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale } = params

  const { children } = props

  return (
    <>
      {children}
      <CookieNotice locale={locale} />
    </>
  )
}
