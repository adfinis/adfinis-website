import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"

export default async function Page() {
  const activeLocale: { href: string; locale: Locale; isActive: boolean } = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  return (
    <>
      <Homepage activeLocale={activeLocale} />
    </>
  )
}
