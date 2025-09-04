import { getEventPage } from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { NavProvider } from "@/components/nav-bar/nav-context"
import InfoLabel from "@/components/info-label"
import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import Container from "@/components/container"
import SectionEvent from "@/components/sections/section-event"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale, getLocaleDateFormatted } from "@/lib/locale"
import { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}): Promise<Metadata> {
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

  return {
    title: data.metadata_title,
    description: data.metadata_description,
    alternates: {
      canonical: `${ABSOLUTE_URL}/${locale}/events/${slug}`,
      languages,
    },
  }
}

export default async function EventsDetailPage({
  params: { locale, slug },
}: {
  params: {
    locale: Locale
    slug: string
  }
}) {
  const dictionary = await getDictionary(locale as Locale)
  const activeLocale = {
    href: `/${locale}/events/${slug}`,
    locale: locale,
    isActive: true,
  }
  const data = await getEventPage(activeLocale.locale, slug)

  const locales = data.localizations.map(
    (item: { locale: Locale; slug: string }) => {
      return {
        href: `/${item.locale.toLowerCase()}/events/${item.slug}`,
        locale: item.locale,
        isActive: false,
      }
    },
  )

  locales.push(activeLocale)

  const {
    hero,
    details,
    date_event,
    time,
    address,
    map_embed_html,
    sign_up_button,
    is_past_event,
    sections,
  } = data

  const tester = is_past_event === false && sign_up_button !== undefined

  if (sign_up_button) {
    sign_up_button.text = sign_up_button?.label
  }

  const formattedDate = getLocaleDateFormatted({
    date: date_event,
    locale: activeLocale.locale as Locale,
  })

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      <Container background="white" padding="both-padding">
        <div className="max-w-4xl mx-auto">
          <InfoLabel
            text={`${dictionary.pages.events.dateEvent}: ${formattedDate}`}
            className="block mb-4"
          />
          <Text markdown={details} className="mb-8" />
          {tester && sign_up_button && (
            <LinkButton
              href={sign_up_button.href}
              size={sign_up_button.size}
              variant={sign_up_button.variant}
            >
              {sign_up_button.label}
            </LinkButton>
          )}
        </div>
      </Container>
      <Container
        padding="both-padding"
        background={is_past_event ? "sapphire" : "stone"}
      >
        <SectionEvent
          title={dictionary.pages.events.title}
          date={date_event}
          location={address}
          time={time}
          html={map_embed_html}
          cta={is_past_event === true ? undefined : sign_up_button}
        />
      </Container>
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}
      <Footer locale={activeLocale.locale} />
    </>
  )
}
