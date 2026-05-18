import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import PartnersProducts from "@/app/[locale]/(partners-products)/partners-products"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getPartnerAndProductsPage } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}): Promise<Metadata> {
  const params = await props.params

  const { locale, slug } = params

  if (!["en", "en-au"].includes(locale)) {
    return notFound()
  }

  const data = await getPartnerAndProductsPage(locale, slug)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase() as Locale
      acc[item.locale] =
        `${ABSOLUTE_URL}/${slugLocale}/${PARTNER_PRODUCTS_SLUGS[slugLocale]}/${item.slug}`
      return acc
    },
    {
      [locale]: `${ABSOLUTE_URL}/${locale}/${PARTNER_PRODUCTS_SLUGS[locale]}/${slug}`,
    },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({
    data,
    locale,
    path: `${PARTNER_PRODUCTS_SLUGS[locale]}/${slug}`,
    languages,
  })
}

export default async function PartnerAndProductsPage(props: {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}) {
  const params = await props.params

  const { locale, slug } = params

  const activeLocale = {
    href: `/${locale.toLowerCase()}/${PARTNER_PRODUCTS_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <PartnersProducts activeLocale={activeLocale} slug={slug} />
}
