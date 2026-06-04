import { notFound } from "next/navigation"
import { Locale } from "@/lib/locale"
import {
  getBlogPageByDocumentId,
  getCaseStudyByDocumentId,
  getEventPageByDocumentId,
  getNewsPageByDocumentId,
  getPageByDocumentId,
  getPartnerAndProductsByDocumentId,
  getSolutionPageByDocumentId,
} from "@/lib/strapi"

import BlogDetail from "@/app/[locale]/blogs/blog-detail"
import EventDetail from "@/app/[locale]/events/event-detail"
import PageDetail from "@/app/[locale]/(pages)/page-detail"
import CaseStudyDetailPage from "@/app/[locale]/(case-studies)/case-study-detail-page"
import SolutionDetail from "@/app/[locale]/(solutions-group)/solution-detail"
import NewsDetail from "@/app/[locale]/(news)/news-detail"
import PartnersProducts from "@/app/[locale]/(partners-products)/partners-products"

export const dynamic = "force-dynamic"

export default async function PreviewByDocumentId(props: {
  params: Promise<{ locale: Locale; type: string; documentId: string }>
}) {
  const { locale, type, documentId } = await props.params

  const activeLocale = {
    href: `/${locale}/preview/${type}/${documentId}`,
    locale,
    isActive: true,
  }

  switch (type) {
    case "page": {
      const data = await getPageByDocumentId(documentId, locale)
      return <PageDetail data={data} activeLocale={activeLocale} />
    }
    case "case-study": {
      const data = await getCaseStudyByDocumentId(documentId, locale)
      return <CaseStudyDetailPage data={data} activeLocale={activeLocale} />
    }
    case "partner-product": {
      const data = await getPartnerAndProductsByDocumentId(documentId, locale)
      return <PartnersProducts data={data} activeLocale={activeLocale} />
    }
    case "solutions-page": {
      const data = await getSolutionPageByDocumentId(documentId, locale)
      return <SolutionDetail data={data} activeLocale={activeLocale} />
    }
    case "news": {
      const data = await getNewsPageByDocumentId(documentId, locale)
      return <NewsDetail data={data} activeLocale={activeLocale} />
    }
    case "blog": {
      const data = await getBlogPageByDocumentId(documentId, locale)
      return <BlogDetail data={data} activeLocale={activeLocale} />
    }
    case "event": {
      const data = await getEventPageByDocumentId(documentId, locale)
      return <EventDetail data={data} activeLocale={activeLocale} />
    }
    default:
      return notFound()
  }
}
