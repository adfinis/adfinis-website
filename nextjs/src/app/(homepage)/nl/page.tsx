import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"
import { Metadata } from "next"
import { getHomepage } from "@/lib/strapi"

export const dynamic = "force-dynamic"
export async function generateMetadata(): Promise<Metadata> {
  const locale = "nl" as Locale
  const data = await getHomepage(locale)
  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        "en-AU": "/en-au",
        "de-DE": "/de-de",
        "de-CH": "/de-ch",
        nl: "/nl",
        "x-default": "/",
      },
    },
  }
}
export default function Home() {
  const locale = "nl" as Locale
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
