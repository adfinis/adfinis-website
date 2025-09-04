import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"
import { Metadata } from "next"
import { getHomepage } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export const dynamic = "force-dynamic"
export async function generateMetadata(): Promise<Metadata> {
  const locale = "nl" as Locale
  const data = await getHomepage(locale)
  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}`,
      languages: {
        en: `${ABSOLUTE_URL}/en`,
        "en-AU": `${ABSOLUTE_URL}/en-au`,
        "de-DE": `${ABSOLUTE_URL}/de-de`,
        "de-CH": `${ABSOLUTE_URL}/de-ch`,
        nl: `${ABSOLUTE_URL}/nl`,
        "x-default": `${ABSOLUTE_URL}/`,
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
