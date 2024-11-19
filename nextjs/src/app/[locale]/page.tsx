import Homepage from "@/app/homepage"

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const currentLocale = {
    href: `/${locale}`,
    locale: locale,
    isActive: true,
  }
  const url = `http://localhost:1337/api/homepage?locale=${currentLocale.locale}&populate=hero_image.external_cta&populate=intro_section&populate=localizations`
  return <Homepage url={url} activeLocale={currentLocale} />
}
