import { SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import PartnersProducts from "@/app/[locale]/(partners-products)/partners-products"

export default async function PartnerAndProductsPage({
  params: { locale, slug },
}: {
  params: {
    locale: string
    slug: string
  }
}) {
  const activeLocale = {
    href: `/${locale}/${SLUGS[locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }

  return <PartnersProducts activeLocale={activeLocale} slug={slug} />
}
