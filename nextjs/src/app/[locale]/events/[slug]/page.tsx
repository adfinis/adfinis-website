import strapi from "@/lib/strapi"
import NavBar from "@/components/nav-bar/nav-bar"
import HeroWrapper from "@/components/stapi/hero-wrapper"
import { NavProvider } from "@/components/nav-bar/nav-context"
import InfoLabel from "@/components/info-label"
import Text from "@/components/text"
import LinkButton from "@/components/link-button"
import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionEvent from "@/components/sections/section-event"
import { renderSections } from "@/components/dynamic-zone/render-sections"
import Footer from "@/components/stapi/footer"
import { getDictionary } from "@/lib/get-dictionary"
import { Locale, getLocaleDateFormatted } from "@/lib/locale"

export default async function EventsDetailPage({
  params: { locale, slug },
}: {
  params: {
    locale: string
    slug: string
  }
}) {
  const dictionary = await getDictionary(locale as Locale)
  const activeLocale = {
    href: `/${locale}/events/${slug}`,
    locale: locale,
    isActive: true,
  }

  const url = `event-pages/${slug}?locale=${activeLocale.locale}&status=published`
  const data = await strapi(url)

  const locales = data.localizations.map(
    (item: { locale: string; slug: string }) => {
      return {
        href: `/${item.locale}/events/${item.slug}`,
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

  return (
    <>
      <NavProvider>
        <NavBar items={locales} />
        {hero && <HeroWrapper hero={hero} />}
      </NavProvider>
      <Container background="white" padding="both-padding">
        <InfoLabel text={date_event} className="block mb-4" />
        <Text markdown={details} className="mb-8 max-w-4xl" />
        {tester && sign_up_button && (
          <LinkButton
            href={sign_up_button.href}
            size={sign_up_button.size}
            variant={sign_up_button.variant}
          >
            {sign_up_button.label}
          </LinkButton>
        )}
      </Container>
      {sections &&
        sections.length > 0 &&
        sections.map((section: any, index: number) =>
          renderSections(section, index, activeLocale.locale),
        )}

      <Container
        padding="both-padding"
        background={is_past_event ? "sapphire" : "stone"}
      >
        <SectionGroup>
          <SectionEvent
            title={dictionary.pages.events.title}
            date={date_event}
            location={address}
            time={time}
            html={map_embed_html}
            cta={is_past_event === true ? undefined : sign_up_button}
          />
        </SectionGroup>
      </Container>
      <Footer locale={activeLocale.locale} />
    </>
  )
}
