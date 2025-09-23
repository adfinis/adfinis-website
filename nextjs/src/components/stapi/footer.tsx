import { getFooter } from "@/lib/strapi"
import { default as FooterWrapper } from "@/components/layout/footer"
import FooterElement from "@/components/layout/footer-element"
import { PARTNER_PRODUCTS_SLUGS, SOLUTIONS_SLUGS } from "@/lib/slugs"
import Link from "next/link"
import IconSocial from "@/components/icons/icon-social"
import FooterLegal from "@/components/layout/footer-legal"
import { Locale } from "@/lib/locale"

export default async function Footer({ locale }: { locale: Locale }) {
  const data = await getFooter(locale)
  if (!data) {
    return null
  }

  const SOLUTIONS_SLUG = `/${locale.toLowerCase()}/${SOLUTIONS_SLUGS[locale.toLowerCase() as Locale]}`
  const PARTNER_PRODUCTS_SLUG = `/${locale.toLowerCase()}/${PARTNER_PRODUCTS_SLUGS[locale.toLowerCase() as Locale]}`

  const aboutMap = {
    en: [
      {
        text: "Privacy Policy",
        href: "/en/privacy-policy",
      },
    ],
    "de-ch": [
      {
        text: "Datenschutzerklärung",
        href: "/de-ch/datenschutzerklaerung",
      },
      {
        text: "Impressum",
        href: "/de-ch/impressum",
      },
    ],
    "de-de": [
      {
        text: "Datenschutzerklärung",
        href: "/de-de/datenschutzerklaerung",
      },
      {
        text: "Impressum",
        href: "/de-ch/impressum",
      },
    ],
    nl: [
      {
        text: "Privacybeleid",
        href: "/nl/privacybeleid",
      },
    ],
    "en-au": [
      {
        text: "Privacy Policy",
        href: "/en-au/privacy-policy",
      },
    ],
  }

  return (
    <FooterWrapper>
      <FooterElement title="Adfinis" text={data.description} />
      <FooterElement
        title={`Solutions`}
        links={data.solution_links.map((item: any) => ({
          text: item.link_label ?? item.page.metadata_title,
          href: `${SOLUTIONS_SLUG}/${item.page.slug}`,
        }))}
      />
      <FooterElement
        title={`Partners & Products`}
        links={data.partner_product_links.map((item: any) => ({
          text: item.link_label ?? item.page.metadata_title,
          href: `${PARTNER_PRODUCTS_SLUG}/${item.page.slug}`,
        }))}
      />
      <FooterElement title={`About`} links={aboutMap[locale]}>
        <div className="flex gap-6">
          <Link href={data.linkedin_url}>
            <IconSocial type={`linkedin`} />
          </Link>
          <Link href={data.github_url}>
            <IconSocial type={`github`} />
          </Link>
          <Link href={data.youtube_url}>
            <IconSocial type={`youtube`} />
          </Link>
        </div>
      </FooterElement>
      <hr className="border-y-stone/15 col-span-1 md:col-span-2 lg:col-span-4" />
      <FooterLegal />
    </FooterWrapper>
  )
}
