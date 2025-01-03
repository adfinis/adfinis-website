import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import strapi from "@/lib/strapi"
import Hero from "@/components/hero"
import Title from "@/components/title"
import Text from "@/components/text"

export default async function SolutionsDetailPage({
  params: { locale, slug },
}: {
  params: {
    locale: string
    slug: string
  }
}) {
  const url = `page-partner-and-products/${slug}`

  const currentLocale = {
    href: `/${locale}/${SLUGS[locale]}`,
    locale: locale,
    isActive: true,
  }

  const { data } = await (await strapi(url)).json()

  const locales = data.localizations.map((item: { locale: string }) => {
    return {
      href: `/${item.locale}/${SLUGS[item.locale]}`,
      locale: item.locale,
      isActive: false,
    }
  })
  locales.push(currentLocale)
  // locales.push(activeLocale)

  const { hero } = data
  console.log({ hero })
  return (
    <>
      {hero && (
        <Hero color={hero.color.color} imageUrl={hero.backround_image.url}>
          <Title markdown={hero.title} />
          <Text markdown={hero.body} />
        </Hero>
      )}
    </>
  )
}
