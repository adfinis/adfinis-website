import Homepage from "@/app/homepage"

export const dynamic = "force-dynamic"

export default async function Page() {
  const currentLocale = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  const url = `homepage?locale=${currentLocale.locale}&populate=hero_image.external_cta&populate=intro_section&populate=localizations`
  return <Homepage url={url} activeLocale={currentLocale} />
}