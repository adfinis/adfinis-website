"use client"
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
import GetStartedForm from "@/components/form/get-started-form"
import { type Locale } from "@/hooks/useLocale"
import SectionCalendly from "@/components/sections/section-calendly"
import ExternalScript from "@/components/external-script"
import Topbar from "@/components/topbar"
import { NavProvider } from "@/components/nav-bar/nav-context"
import { CardMessage } from "@/components/cards/card-message"
import SectionEvent from "@/components/sections/section-event"
import InfoLabel from "@/components/info-label"
import LinkButton from "@/components/link-button"

export default function Theme({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
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
        <Text markdown={intro.text} className="grid gap-8" />
      </Intro>

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
        <GetStartedForm locale={locale} />
      </Container>

      <Container
        id="contact-form-light"
        background="neutral"
        padding="both-padding"
      >
        <StandardForm locale={locale} />
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
          <CardGroup hasDividers columns={3} maxWidth="7xl">
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
    </main>
  )
}
