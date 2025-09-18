import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"
import { Metadata } from "next"
import { getHomepage } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export const dynamic = "force-dynamic"
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage("en")
  return {
    title: data.metadata_title,
    description: data.meta_description, // TODO change to metadata
    alternates: {
      canonical: `${ABSOLUTE_URL}/`,
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
