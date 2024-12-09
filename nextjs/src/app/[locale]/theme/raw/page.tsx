"use client"

import Text from "@/components/text"
import Title from "@/components/title"
import Button from "@/components/button"
import { example } from "../texts"
import LinkButton from "@/components/link-button"

export default function Buttons() {
  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <main>
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
        <LinkButton href="https://google.com" size="large" variant="cta">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="cta">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="cta" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="secondary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="secondary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="secondary"
          disabled
        >
          label
        </LinkButton>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <LinkButton href="https://google.com" size="large" variant="text">
          text - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="text">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="text" disabled>
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </LinkButton>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <LinkButton href="https://google.com" size="small" variant="cta">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="cta">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="cta" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="secondary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="secondary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="secondary"
          disabled
        >
          label
        </LinkButton>
      </div>
      <div className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3">
        <LinkButton href="https://google.com" size="small" variant="text">
          text - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="text">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="text" disabled>
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </LinkButton>
      </div>
      {/* Dark Theme */}
      <div
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
        data-scheme="dark"
      >
        <LinkButton href="https://google.com" size="large" variant="cta">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="cta">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="cta" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="secondary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="secondary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="secondary"
          disabled
        >
          label
        </LinkButton>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-biscay"
      >
        <LinkButton href="https://google.com" size="large" variant="text">
          text - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="text">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="text" disabled>
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          text - large
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          text - large
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          chevron="right"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </LinkButton>
      </div>

      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <LinkButton href="https://google.com" size="small" variant="cta">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="cta">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="cta" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary" disabled>
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="secondary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="secondary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="secondary"
          disabled
        >
          label
        </LinkButton>
      </div>
      <div
        data-scheme="dark"
        className="container py-8 grid place-items-start gap-12 grid-cols-1 lg:grid-cols-3 bg-stone"
      >
        <LinkButton href="https://google.com" size="small" variant="text">
          text - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="text">
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="text" disabled>
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          text - small
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="left"
          disabled
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          text - small
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          chevron="right"
        >
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          disabled
          chevron="right"
        >
          label
        </LinkButton>
      </div>
    </main>
  )
}
