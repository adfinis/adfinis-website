"use client"
import Button from "@/components/button"
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
  example,
  ctaSection,
  resourcesSection,
  media2Section,
  statisticsSection,
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

export default function Theme() {
  const handleClick = () => {
    console.log("Button clicked!")
    alert("Button clicked!")
  }

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

      <Container id="Solutions" padding={"start-padding"} background="neutral">
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
        <SectionGroup title={mediaSection.title} text={mediaSection.text}>
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
          <CardGroup>
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

      <Container id="Resources" padding={"start-padding"} background="neutral">
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

      <div data-scheme="dark" className="container py-8 bg-sapphire">
        <Text markdown={example} />
      </div>

      <div className="container py-8" data-scheme="light">
        <Title level={1}>
          H1 Title: Meet <b>Adfinis</b> quality
        </Title>
        <Title level={2}>
          H2 Title: <b>Example</b>
        </Title>
        <Title level={3}>
          H3 Title: <b>Example</b>
        </Title>
      </div>
      {/* <div className="min-h-[300px]">Hero.</div> */}
      <div className="container">
        <h1 className="text-40 font-bold col-span-3 text-razzmatazz">Colors</h1>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-2 lg:grid-cols-3">
        <span className="w-full bg-stone rounded p-4 text-20 md:text-35 text-neutral">
          <b>Stone</b>
          <br /> #0f0f0f
          <br /> rgb(15, 15, 15)
        </span>
        <span className="w-full bg-sapphire rounded p-4 text-20 md:text-35">
          <b>Sapphire</b>
          <br /> #2e4b98
          <br /> rgb(46, 75, 152)
        </span>
        <span className="w-full bg-sky rounded p-4 text-20 md:text-35">
          <b>Sky</b>
          <br /> #55c0ee
          <br /> rgb(85, 192, 238)
        </span>
        <span className="w-full bg-biscay rounded p-4 text-20 md:text-35">
          <b>Biscay</b>
          <br /> #1c2e5d
          <br /> rgb(28, 46, 93)
        </span>
        <span className="w-full bg-jumbo rounded p-4 text-20 md:text-35">
          <b>Jumbo</b>
          <br /> #8b8b8c
          <br /> rgb(139, 139, 140)
        </span>
        <span className="w-full bg-neutral text-stone rounded p-4 text-20 md:text-35 border border-stone">
          <b>Neutral</b>
          <br /> #f5f6f5
          <br /> rgb(245, 246, 245)
        </span>
        <span className="w-full bg-sunglow rounded p-4 text-20 md:text-35">
          <b>Sunglow</b>
          <br /> #ffca31
          <br /> rgb(255, 202, 49)
        </span>
        <span className="w-full bg-cinnamon rounded p-4 text-20 md:text-35">
          <b>Cinnamon</b>
          <br /> #e56820
          <br /> rgb(229, 104, 32)
        </span>
        <span className="w-full bg-green rounded p-4 text-20 md:text-35">
          <b>Green</b>
          <br /> #34ae6b
          <br /> rgb(52, 174, 107)
        </span>
        <span className="w-full bg-razzmatazz rounded p-4 text-20 md:text-35">
          <b>Razzmatazz</b>
          <br /> #e30d74
          <br /> rgb(227, 13, 116)
        </span>
        <span className="w-full bg-fuchsia rounded p-4 text-20 md:text-35">
          <b>Fuchsia</b>
          <br /> #7e57c2
          <br /> rgb(126, 87, 194)
        </span>
        <span className="w-full bg-manhattan rounded p-4 text-20 md:text-35">
          <b>Manhattan</b>
          <br /> #f7c6a5
          <br /> rgb(247, 198, 165)
        </span>
      </div>
      <div className="container">
        <h1 className="text-40 font-bold col-span-3 text-razzmatazz">
          Buttons
        </h1>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Button onClick={handleClick} size="large" variant="cta">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="cta">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="cta" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="primary">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="primary">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="primary" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary" disabled>
          label
        </Button>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Button onClick={handleClick} size="large" variant="text">
          text - large
        </Button>
        <Button onClick={handleClick} size="large" variant="text">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="text" disabled>
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Button onClick={handleClick} size="small" variant="cta">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="cta">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="cta" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="primary">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="primary">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="primary" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary" disabled>
          label
        </Button>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Button onClick={handleClick} size="small" variant="text">
          text - small
        </Button>
        <Button onClick={handleClick} size="small" variant="text">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="text" disabled>
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
      {/* Dark Theme */}
      <div
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
        data-scheme="dark"
      >
        <Button onClick={handleClick} size="large" variant="cta">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="cta">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="cta" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="primary">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="primary">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="primary" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary">
          CTA - large
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="secondary" disabled>
          label
        </Button>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
      >
        <Button onClick={handleClick} size="large" variant="text">
          text - large
        </Button>
        <Button onClick={handleClick} size="large" variant="text">
          label
        </Button>
        <Button onClick={handleClick} size="large" variant="text" disabled>
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>

      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <Button onClick={handleClick} size="small" variant="cta">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="cta">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="cta" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="primary">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="primary">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="primary" disabled>
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary">
          CTA - small
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="secondary" disabled>
          label
        </Button>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <Button onClick={handleClick} size="small" variant="text">
          text - small
        </Button>
        <Button onClick={handleClick} size="small" variant="text">
          label
        </Button>
        <Button onClick={handleClick} size="small" variant="text" disabled>
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          onClick={handleClick}
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
      <div className="container">
        <h1 className="text-40 font-bold col-span-3 text-razzmatazz">Links</h1>
      </div>
      <div
        data-scheme="light"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3"
      >
        <Link href="https://google.com" size="large" variant="cta">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="cta">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="cta" disabled>
          label
        </Link>
        <Link href="https://google.com" size="large" variant="primary">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="primary">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="primary" disabled>
          label
        </Link>
        <Link href="https://google.com" size="large" variant="secondary">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="secondary">
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="secondary"
          disabled
        >
          label
        </Link>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Link href="https://google.com" size="large" variant="text">
          text - large
        </Link>
        <Link href="https://google.com" size="large" variant="text">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="text" disabled>
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Link>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Link href="https://google.com" size="small" variant="cta">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="cta">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="cta" disabled>
          label
        </Link>
        <Link href="https://google.com" size="small" variant="primary">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="primary">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="primary" disabled>
          label
        </Link>
        <Link href="https://google.com" size="small" variant="secondary">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="secondary">
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="secondary"
          disabled
        >
          label
        </Link>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <Link href="https://google.com" size="small" variant="text">
          text - small
        </Link>
        <Link href="https://google.com" size="small" variant="text">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="text" disabled>
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Link>
      </div>
      {/* Dark Theme */}
      <div
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
        data-scheme="dark"
      >
        <Link href="https://google.com" size="large" variant="cta">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="cta">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="cta" disabled>
          label
        </Link>
        <Link href="https://google.com" size="large" variant="primary">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="primary">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="primary" disabled>
          label
        </Link>
        <Link href="https://google.com" size="large" variant="secondary">
          CTA - large
        </Link>
        <Link href="https://google.com" size="large" variant="secondary">
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="secondary"
          disabled
        >
          label
        </Link>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
      >
        <Link href="https://google.com" size="large" variant="text">
          text - large
        </Link>
        <Link href="https://google.com" size="large" variant="text">
          label
        </Link>
        <Link href="https://google.com" size="large" variant="text" disabled>
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Link>
      </div>

      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <Link href="https://google.com" size="small" variant="cta">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="cta">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="cta" disabled>
          label
        </Link>
        <Link href="https://google.com" size="small" variant="primary">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="primary">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="primary" disabled>
          label
        </Link>
        <Link href="https://google.com" size="small" variant="secondary">
          CTA - small
        </Link>
        <Link href="https://google.com" size="small" variant="secondary">
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="secondary"
          disabled
        >
          label
        </Link>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <Link href="https://google.com" size="small" variant="text">
          text - small
        </Link>
        <Link href="https://google.com" size="small" variant="text">
          label
        </Link>
        <Link href="https://google.com" size="small" variant="text" disabled>
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </Link>
        <Link
          href="https://google.com"
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </Link>
      </div>
    </main>
  )
}
