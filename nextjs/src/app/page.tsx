import Homepage from "@/app/homepage"

export default async function Page() {
  const currentLocale = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  const url = `http://localhost:1337/api/homepage?locale=${currentLocale.locale}&populate=hero_image.external_cta&populate=intro_section&populate=localizations`
  return <Homepage url={url} activeLocale={currentLocale} />
}
