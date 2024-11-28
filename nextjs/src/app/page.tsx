import Homepage from "@/app/homepage"
import { STRAPI } from "@/lib/constants"

export const dynamic = "force-dynamic"

export default async function Page() {
  const currentLocale = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  const url = `${STRAPI}/homepage?locale=${currentLocale.locale}&populate=hero_image.external_cta&populate=intro_section&populate=localizations`
  return <Homepage url={url} activeLocale={currentLocale} />
}
