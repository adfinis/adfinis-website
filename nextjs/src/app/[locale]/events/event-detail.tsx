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
import { LinkedLocale } from "@/components/nav-bar/linked-locales-provider"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale, getLocaleDateRangeFormatted } from "@/lib/locale"

export default async function EventDetail({
  activeLocale,
  data,
}: {
  activeLocale: LinkedLocale
  data: any
}) {
  const dictionary = await getDictionary(activeLocale.locale as Locale)

  const locales = (data.localizations ?? []).map(
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
    date_event_end,
    time,
    address,
    map_embed_html,
    sign_up_button,
    is_past_event,
    show_event_details_section,
    sections,
  } = data

  const tester = is_past_event === false && sign_up_button !== undefined

  if (sign_up_button) {
    sign_up_button.text = sign_up_button?.label
  }

  const formattedDate = getLocaleDateRangeFormatted({
    startDate: date_event,
    endDate: date_event_end,
    locale: activeLocale.locale as Locale,
  })

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      <section
        className="px-4 lg:px-0 relative bg-white"
        data-testid="news-detail"
      >
        <div className="container">
          <div className="max-w-4xl mx-auto pb-8">
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
        </div>
      </section>
      {show_event_details_section && (
        <Container
          padding="both-padding"
          background={is_past_event ? "sapphire" : "stone"}
        >
          <SectionEvent
            title={dictionary.pages.events.title}
            date={formattedDate}
            location={address}
            time={time}
            html={map_embed_html}
            cta={is_past_event === true ? undefined : sign_up_button}
          />
        </Container>
      )}
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}
      <Footer locale={activeLocale.locale} />
    </>
  )
}
