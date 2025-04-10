import Hero from "@/components/hero"
import Intro from "@/components/intro"
import Link from "@/components/link-button"
import Title from "@/components/title"
import Text from "@/components/text"
import {
  navItems,
  hero,
  intro,
  solutions,
  mediaSection,
  logoSection,
  journeySection,
  ctaSection,
  resourcesSection,
  media2Section,
  statisticsSection,
  slaSection,
  partnerSection,
  quoteSection,
  twoColumnMarkdownSection,
  calendlySection,
  youtubeSection,
  services,
  cardIconGridExample,
  cardIconWiderExample,
  eventDetails,
  eventSection,
  eventGrid,
  careerGrid,
  imageSlider,
  teamMembers,
  speakersSection,
  locations,
} from "./texts"
import Container from "@/components/container"
import CardSlider from "@/components/cards/card-slider"
import CardSliderElement from "@/components/cards/card-slider-element"
import SectionCardWide from "@/components/sections/section-card-wide"
import SectionGroup from "@/components/sections/section-group"
import LogoGroup from "@/components/logo-group"
import ButtonGroup from "@/components/button-group"
import CardIcon from "@/components/cards/card-icon"
import CardGroup from "@/components/cards/card-group"
import CardColored from "@/components/cards/card-colored"
import CardArticle from "@/components/cards/card-article"
import CardKpi from "@/components/cards/card-kpi"
import CardService from "@/components/cards/card-service"
import SectionCardLogo from "@/components/sections/section-card-logo"
import SectionQuote from "@/components/sections/section-quote"
import StandardForm from "@/components/form/standard-form"
import { type Locale } from "@/lib/locale"
import SectionCalendly from "@/components/sections/section-calendly"
import ExternalScript from "@/components/external-script"
import Topbar from "@/components/topbar"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { CardMessage } from "@/components/cards/card-message"
import SectionEvent from "@/components/sections/section-event"
import InfoLabel from "@/components/info-label"
import LinkButton from "@/components/link-button"
import CardCareer from "@/components/cards/card-career"
import CardImage from "@/components/cards/card-image"
import CardMember from "@/components/cards/card-member"
import CardPortrait from "@/components/cards/card-portrait"
import { Country as CareerCountry } from "@/components/icons/icon-flag"
import { getDictionary } from "@/lib/get-dictionary"
import CardLocation from "@/components/cards/card-location"

export default async function Theme({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const dictionary = await getDictionary(locale)
  return (
    <main className="bg-white">
      <NavProvider>
        <Topbar navItems={navItems} />
        <Hero
          color="white"
          imageUrl="https://images.unsplash.com/photo-1682687220198-88e9bdea9931?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        >
          <Title markdown={hero.title} />
          <Text markdown={hero.text} />
          <Link href="https://www.adfinis.com" size="large">
            Learn how
          </Link>
        </Hero>
      </NavProvider>
      <Intro>
        <Title markdown={intro.title} align="center" />
        <Text markdown={intro.text} />
      </Intro>

      <Container id="Locations" background="white" padding="both-padding">
        <CardGroup
          smColumns={2}
          lgColumns={3}
          maxWidth="none"
          className="gap-6"
        >
          {locations.map((location, index) => (
            <CardLocation
              key={index}
              title={location.title}
              description={location.description}
            />
          ))}
        </CardGroup>
      </Container>

      <Container id="Solutions" padding="both-padding" background="neutral">
        <CardSlider
          title={solutions.title}
          description={solutions.description}
          ctas={solutions.ctas}
        >
          {solutions.cards.map((card, index) => {
            return (
              <CardSliderElement key={index}>
                <CardColored
                  color={card.color}
                  title={card.title}
                  description={card.description}
                />
              </CardSliderElement>
            )
          })}
        </CardSlider>
      </Container>

      <Container id="Projects" background="stone" padding="both-padding">
        <SectionGroup
          title={mediaSection.title}
          text={mediaSection.text}
          align={"center"}
        >
          {mediaSection.media.map((item, i) => {
            return (
              <SectionCardWide
                reverse={i % 2 === 1}
                image={item.image}
                key={i}
                ctas={item.ctas}
              >
                <Title level={3} boldness={"semibold"}>
                  {item.title}
                </Title>
                <Text markdown={item.text} />
              </SectionCardWide>
            )
          })}
        </SectionGroup>
      </Container>

      <Container id="Partners" background="white" padding="both-padding">
        <SectionGroup
          title={logoSection.title}
          text={logoSection.text}
          align="center"
        >
          <ButtonGroup ctas={logoSection.ctas} align={"center"} />
          <LogoGroup logos={[...logoSection.logos]} />
        </SectionGroup>
      </Container>

      <Container id="Journeys" background="neutral" padding="both-padding">
        <SectionGroup title={journeySection.title}>
          <CardGroup hasDividers>
            {journeySection.cards.map((item, i) => {
              return (
                <CardIcon
                  imageUrl={item.icon.src}
                  title={item.title}
                  description={item.description}
                  cta={item.cta}
                  key={i}
                />
              )
            })}
          </CardGroup>
        </SectionGroup>
      </Container>

      <Container id="JourneyCta" background="sapphire" padding="both-padding">
        <SectionGroup title={ctaSection.title} align={"center"}>
          <ButtonGroup align={"center"} ctas={[ctaSection.cta]} />
        </SectionGroup>
      </Container>

      <Container id="Resources" padding="both-padding" background="neutral">
        <CardSlider
          title={resourcesSection.title}
          description={resourcesSection.description}
          ctas={resourcesSection.ctas}
        >
          {resourcesSection.cards.map((card, index) => {
            return (
              <CardSliderElement key={index}>
                <CardArticle {...card} />
              </CardSliderElement>
            )
          })}
        </CardSlider>
      </Container>

      <Container id="WhoWeAre" background="stone" padding="both-padding">
        <SectionGroup>
          {media2Section.media.slice(0, 2).map((item, i) => {
            return (
              <SectionCardWide
                reverse={i % 2 === 1}
                image={item.image}
                key={i}
                ctas={item.ctas}
                color="cinnamon"
              >
                <Title level={3} boldness={"semibold"}>
                  {item.title}
                </Title>
                <Text markdown={item.text} />
              </SectionCardWide>
            )
          })}
        </SectionGroup>
      </Container>

      <Container id="Statistics" background="neutral" padding="both-padding">
        <SectionGroup
          align="center"
          title={statisticsSection.title}
          text={statisticsSection.description}
        >
          <CardGroup>
            {statisticsSection.cards.map((item, i) => (
              <CardKpi
                key={i}
                title={item.title}
                imageUrl={item.icon.src}
                description={item.description}
              />
            ))}
          </CardGroup>
          <LogoGroup
            logos={[...statisticsSection.logos.slice(0, 7)]}
            columns="auto"
          />
        </SectionGroup>
      </Container>

      <Container id="CareerCta" background="sapphire" padding="both-padding">
        <SectionGroup title={ctaSection.title} align={"center"}>
          <ButtonGroup align={"center"} ctas={[ctaSection.cta]} />
        </SectionGroup>
      </Container>

      <Container id="SLA" background="neutral" padding="both-padding">
        <SectionGroup title={slaSection.title}>
          <CardGroup hasDividers>
            {slaSection.cards.map((item, i) => {
              return (
                <CardService
                  key={i}
                  title={item.title}
                  description=""
                  usps={[...item.usps]}
                />
              )
            })}
          </CardGroup>
        </SectionGroup>
      </Container>

      <Container id="partners" background="sapphire" padding="both-padding">
        <SectionGroup title={partnerSection.title} hasDividers>
          {partnerSection.partners.map((item, i) => {
            return (
              <SectionCardLogo
                key={i}
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
                ctas={[...item.ctas]}
              />
            )
          })}
        </SectionGroup>
      </Container>

      <Container id="quote" background="white" padding="both-padding">
        <SectionGroup hasDividers>
          <SectionQuote
            author={quoteSection.author}
            image={quoteSection.image}
            quote={quoteSection.quote}
          />
        </SectionGroup>
      </Container>

      <Container
        id="contact-form-dark"
        background="stone"
        padding="both-padding"
      >
        <StandardForm dictionary={dictionary} />
      </Container>

      <Container
        id="contact-form-light"
        background="neutral"
        padding="both-padding"
      >
        <StandardForm dictionary={dictionary} />
      </Container>

      <Container
        id="two-column-markdown"
        background="stone"
        padding="both-padding"
      >
        <SectionGroup columns={2}>
          <Text markdown={twoColumnMarkdownSection.column1} />
          <Text markdown={twoColumnMarkdownSection.column2} />
        </SectionGroup>
      </Container>

      <Container
        id="calendly-example"
        background="neutral"
        padding="both-padding"
      >
        <SectionGroup title={calendlySection.title}>
          <SectionCalendly url={calendlySection.url} />
        </SectionGroup>
      </Container>

      <Container id="calendly-dark" background="stone" padding="both-padding">
        <SectionGroup title={calendlySection.title}>
          <SectionCalendly url={calendlySection.url} />
        </SectionGroup>
      </Container>

      <Container id="youtube" background="neutral" padding="both-padding">
        <SectionGroup title="Youtube">
          <ExternalScript
            html={youtubeSection.html}
            className="w-full h-auto"
          />
        </SectionGroup>
      </Container>
      <Container id="youtube" background="neutral" padding="both-padding">
        <SectionGroup title="Youtube in a SectionCardWide">
          <SectionCardWide
            childrenWide={
              <ExternalScript
                html={youtubeSection.html}
                className="w-full h-auto"
              />
            }
          >
            <Title level={3} boldness={"semibold"}>
              {youtubeSection.title}
            </Title>
            <Text markdown={youtubeSection.text} />
          </SectionCardWide>
        </SectionGroup>
      </Container>
      <Container id="our-services" padding="both-padding" background="white">
        <CardSlider
          title={services.title}
          description={services.description}
          ctas={services.ctas}
        >
          {solutions.cards.map((card, index) => {
            return (
              <CardSliderElement key={index}>
                <CardMessage
                  title={card.title}
                  description={card.description}
                />
              </CardSliderElement>
            )
          })}
        </CardSlider>
      </Container>

      <Container
        id="card-icon-grid"
        padding="both-padding"
        background="neutral"
      >
        <SectionGroup title="Why Adfinis?" align="center">
          <CardGroup maxWidth="none">
            {cardIconGridExample.cards.map((item, i) => {
              return (
                <CardIcon
                  imageUrl={item.icon.src}
                  title={item.title}
                  description={item.description}
                  cta={item.cta}
                  key={i}
                />
              )
            })}
          </CardGroup>
          <ButtonGroup align={"center"} ctas={[ctaSection.cta]} />
        </SectionGroup>
      </Container>

      <Container id="card-icon-grid" padding="both-padding" background="white">
        <SectionGroup title="Why Adfinis?" align="center">
          <CardGroup hasDividers lgColumns={3} maxWidth="7xl">
            {cardIconWiderExample.cards.map((item, i) => {
              return (
                <CardIcon
                  imageUrl={item.icon.src}
                  title={item.title}
                  description={item.description}
                  key={i}
                />
              )
            })}
          </CardGroup>
        </SectionGroup>
      </Container>

      <Container
        id="event-grid-example"
        padding="both-padding"
        background="neutral"
      >
        <CardGroup maxWidth="none">
          {eventGrid.map((event, index) => (
            <CardArticle
              key={index}
              title={event.title}
              subtitle={event.location}
              description={event.date}
              imageUrl={event.image.src}
              logoUrl={event.logo.src}
            />
          ))}
        </CardGroup>
      </Container>

      <Container id="event-info" padding="both-padding" background="stone">
        <SectionGroup>
          <SectionEvent
            title={eventSection.title}
            date={eventSection.date}
            location={eventSection.location}
            time={eventSection.time}
            html={eventSection.html}
            cta={eventSection.cta}
          />
        </SectionGroup>
      </Container>

      <Container id="event-example" background="white" padding="both-padding">
        <InfoLabel text={eventDetails.info} className="block mb-4" />
        <Text markdown={eventDetails.description} className="mb-8 max-w-4xl" />
        <LinkButton {...eventSection.cta}>{eventSection.cta.text}</LinkButton>
      </Container>

      <Container
        id="career-grid-example"
        padding="both-padding"
        background="neutral"
      >
        <CardGroup maxWidth="none" lgColumns={3}>
          {careerGrid.map((career, index) => (
            <CardCareer
              key={index}
              title={career.title}
              description={career.description}
              imageUrl={career.image?.url || ""}
              workload={career.workload}
              location={career.location}
              country={career.country as CareerCountry}
              href={career.href}
            />
          ))}
        </CardGroup>
      </Container>

      <Container
        id="image-slider-example"
        padding="both-padding"
        background="white"
      >
        <CardSlider
          title={imageSlider.title}
          description={imageSlider.description}
          ctas={imageSlider.ctas}
        >
          {imageSlider.cards.map((card, index) => {
            return (
              <CardSliderElement key={index}>
                <CardImage
                  alt={card.alt}
                  src={card.src}
                  className="h-48 sm:h-96 w-auto"
                />
              </CardSliderElement>
            )
          })}
        </CardSlider>
      </Container>

      <Container
        id="team-members-example"
        padding="both-padding"
        background="white"
      >
        <CardGroup
          columns={2}
          smColumns={3}
          lgColumns={4}
          className="gap-4 sm:gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <CardMember key={index} {...member} />
          ))}
        </CardGroup>
      </Container>

      <Container
        id="speakers-example"
        padding="both-padding"
        background="neutral"
      >
        <CardGroup columns={1} smColumns={1} mdColumns={1} lgColumns={1}>
          <Title level={3} boldness="semibold" align={"left"}>
            {speakersSection.title}
          </Title>
          {speakersSection.speakers.map((speaker, index) => {
            return (
              <CardPortrait
                title={speaker.title}
                imageUrl={speaker.image.src}
                description={speaker.description}
                key={index}
              />
            )
          })}
          <ButtonGroup ctas={[speakersSection.cta]} />
        </CardGroup>
      </Container>
    </main>
  )
}
