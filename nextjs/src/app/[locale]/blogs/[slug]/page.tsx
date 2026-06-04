import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { getBlogPage } from "@/lib/strapi"
import { BLOG_SLUGS } from "@/lib/slugs"
import { buildMetadata } from "@/lib/metadata"
import BlogDetail from "@/app/[locale]/blogs/blog-detail"

export async function generateMetadata(props: {
  params: Promise<{
    locale: string
    slug: string
  }>
}): Promise<Metadata> {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale, slug } = params

  const data = await getBlogPage(locale, slug)

  return buildMetadata({
    data,
    locale,
    path: `${BLOG_SLUGS[locale]}/${slug}`,
    type: "article",
  })
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale, slug } = params

  const activeLocale = {
    href: `/${locale.toLowerCase()}/${BLOG_SLUGS[locale.toLowerCase() as Locale]}/${slug}`,
    locale: locale,
    isActive: true,
  }
  const data = await getBlogPage(activeLocale.locale, slug)
  return <BlogDetail data={data} activeLocale={activeLocale} />
}
