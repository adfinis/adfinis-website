import strapi from "@/lib/strapi"
import { default as FooterWrapper } from "@/components/layout/footer"
import FooterElement from "@/components/layout/footer-element"
import { SLUGS } from "@/app/[locale]/(solutions-group)/solutions-slugs"
import { PARTNER_PRODUCTS_SLUGS } from "@/app/[locale]/(partners-products)/slugs"
import Link from "next/link"
import IconSocial from "@/components/icons/icon-social"
import FooterLegal from "@/components/layout/footer-legal"

export default async function Footer({ locale }: { locale: string }) {
  const { data } = await (
    await strapi(
      `footer/?locale=${locale}&populate=solutions&populate=partner_and_products`,
    )
  ).json()
  if (!data) {
    return null
  }

  const SOLUTIONS_SLUG = `/${locale}/${SLUGS[locale]}`
  const PARTNER_PRODUCTS_SLUG = `/${locale}/${PARTNER_PRODUCTS_SLUGS[locale]}`

  return (
    <FooterWrapper>
      <FooterElement title="Adfinis" text={data.description} />
      <FooterElement
        title={`Solutions`}
        links={data.solutions.map((item) => ({
          text: item.metadata_title,
          href: `${SOLUTIONS_SLUG}/${item.slug}`,
        }))}
      />
      <FooterElement
        title={`Partners & Products`}
        links={data.partner_and_products.map((item) => ({
          text: item.metadata_title,
          href: `${PARTNER_PRODUCTS_SLUG}/${item.slug}`,
        }))}
      />
      <FooterElement
        title={`About`}
        links={
          [
            /* TODO add landing pages */
          ]
        }
      >
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
      <FooterLegal
        privacyPolicy={{
          text: "Privacy Policy",
          // TODO move to landing page
          href: "/privacy-policy",
        }}
      />
    </FooterWrapper>
  )
}
