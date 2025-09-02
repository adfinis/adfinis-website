import Homepage from "@/app/homepage"
import { Locale } from "@/lib/locale"
import CookieNotice from "@/components/cookie-notice"
import { Metadata } from "next"
import { getHomepage } from "@/lib/strapi"

export const dynamic = "force-dynamic"
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage("en")
  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `/`,
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
