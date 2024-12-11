"use client"
import Hero from "@/components/hero"
import Intro from "@/components/intro"
import Link from "@/components/link-button"
import Title from "@/components/title"
import Text from "@/components/text"
import {
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
import CardCounter from "@/components/cards/card-counter"
import CardService from "@/components/cards/card-service"
import SectionCardLogo from "@/components/sections/section-card-logo"

export default function Theme() {
  return (
    <main className="bg-white">
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
      <Intro>
        <Title markdown={intro.title} align="center" />
        <Text markdown={intro.text} className="grid gap-8" />
      </Intro>

      <Container id="Solutions" padding="no-padding" background="neutral">
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
                reverse={i % 2 === 0}
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

      <Container id="Resources" padding="no-padding" background="neutral">
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
                reverse={i % 2 === 0}
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
              <CardCounter
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
    </main>
  )
}
