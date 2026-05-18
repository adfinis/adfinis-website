import { Locale } from "@/lib/locale"
import { ReactNode } from "react"
import CookieNotice from "@/components/cookie-notice"

export default async function Layout(
  props: {
    children: ReactNode
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return (
    <>
      {children}
      <CookieNotice locale={locale} />
    </>
  )
}
