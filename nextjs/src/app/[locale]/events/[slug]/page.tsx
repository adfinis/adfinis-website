import { getEventPage } from "@/lib/strapi"
import { Locale } from "@/lib/locale"
import { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { buildMetadata } from "@/lib/metadata"
import EventDetail from "@/app/[locale]/events/event-detail"

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

  const data = await getEventPage(locale, slug)
  const languages = data.localizations.reduce(
    (acc: any, item: any) => {
      const slugLocale = item.locale.toLowerCase()
      acc[item.locale] = `${ABSOLUTE_URL}/${slugLocale}/events/${item.slug}`
      return acc
    },
    { [locale]: `${ABSOLUTE_URL}/${locale}/events/${slug}` },
  )

  if (languages?.en !== undefined) {
    languages["x-default"] = languages.en
  }

  return buildMetadata({
    data,
    locale,
    path: `events/${slug}`,
    type: "article",
    languages,
  })
}

export default async function EventsDetailPage(props: {
  params: Promise<{
    locale: string
    slug: string
  }>
}) {
  const params = (await props.params) as Awaited<typeof props.params> & {
    locale: Locale
  }

  const { locale, slug } = params

  const activeLocale = {
    href: `/${locale}/events/${slug}`,
    locale: locale,
    isActive: true,
  }
  const data = await getEventPage(activeLocale.locale, slug)
  return <EventDetail data={data} activeLocale={activeLocale} />
}
