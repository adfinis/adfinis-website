import { PARTNER_PRODUCTS_SLUGS } from "@/lib/slugs"
import PartnersProducts from "@/app/[locale]/(partners-products)/partners-products"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getPartnerAndProductsPage } from "@/lib/strapi"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
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

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/${PARTNER_PRODUCTS_SLUGS[locale]}/${slug}`,
      languages,
    },
  }
}

export default async function PartnerAndProductsPage({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}) {
  const activeLocale = {
    href: `/${locale.toLowerCase()}/${PARTNER_PRODUCTS_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <PartnersProducts activeLocale={activeLocale} slug={slug} />
}
