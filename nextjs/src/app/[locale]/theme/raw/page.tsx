"use client"

import Text from "@/components/text"
import Title from "@/components/title"
import Button from "@/components/button"
import LinkButton from "@/components/link-button"

const example = `
# Heading 1 **Example**
## Heading 2 **Example**
### Heading 3 **Example**

Originating in **Switzerland**, Adfinis draws *inspiration* from the ***majestic Swiss Alps***, embodying the spirit of exploration and the pursuit of excellence. We provide cutting-edge technology services, including ~~manual work~~ consulting, software development, and managed services, to help organizations optimize their IT environments and boost operational efficiency.  Much like a journey through mountainous terrain, our deep expertise in various technologies and our strong commitment to open-source principles guide you through the complexities of IT landscapes. With Adfinis, you embark on a path towards greater flexibility, scalability, and security in your IT operations, ensuring your organization reaches new heights of success. Feel free to [visit our website](https://www.adfinis.com/en-US/theme).

Originating in **Switzerland**, Adfinis draws *inspiration* from the ***majestic Swiss Alps***, embodying the spirit of exploration and the pursuit of excellence. We provide cutting-edge technology services, including ~~manual work~~ consulting, software development, and managed services, to help organizations optimize their IT environments and boost operational efficiency.  Much like a journey through mountainous terrain, our deep expertise in various technologies and our strong commitment to open-source principles guide you through the complexities of IT landscapes. With Adfinis, you embark on a path towards greater flexibility, scalability, and security in your IT operations, ensuring your organization reaches new heights of success. Feel free to [visit our website](https://www.adfinis.com/en-US/theme).
> Blockquote example
1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered list item 1
   2. Nested ordered list item 2

Small text.

- Unordered list item 1
- Unordered list item 2
   - Nested unordered list item 1
   - Nested unordered list item 2

### Lists with **long blocks**
- This is a very long sentence that is meant to test how well the markdown renderer handles text that spans multiple lines without any line breaks, ensuring that the text wraps correctly and maintains readability across different devices and screen sizes.
- Another extremely long sentence follows, designed to push the limits of the markdown formatting and see if it can gracefully manage extensive content without breaking the layout or causing any unexpected issues in the display, making sure that everything remains user-friendly and visually appealing.
`

export default function Buttons() {
  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <main>
      <div className="container min-h-20 grid">
        <span className="w-full sm:hidden bg-sunglow">Display MOBILE</span>
        <span className="w-full hidden sm:block md:hidden bg-razzmatazz">
          Display SM
        </span>
        <span className="w-full hidden md:block lg:hidden bg-cinnamon">
          Display MD
        </span>
        <span className="w-full hidden lg:block xl:hidden bg-green">
          Display LG
        </span>
        <span className="w-full hidden xl:block 2xl:hidden bg-sky">
          Display XL
        </span>
        <span className="w-full hidden 2xl:block 3xl:hidden bg-fuchsia">
          Display 2XL
        </span>
        <span className="w-full hidden 3xl:block 4xl:hidden bg-manhattan">
          Display 3XL
        </span>
        <span className="w-full hidden 4xl:block bg-jumbo">Display 4XL</span>
      </div>
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
        <LinkButton
          href="https://google.com"
          size="large"
          variant="cta"
          disabled
        >
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="primary"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="small"
          variant="cta"
          disabled
        >
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="primary"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="large"
          variant="cta"
          disabled
        >
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          CTA - large
        </LinkButton>
        <LinkButton href="https://google.com" size="large" variant="primary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="large"
          variant="primary"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="large"
          variant="text"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="small"
          variant="cta"
          disabled
        >
          label
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          CTA - small
        </LinkButton>
        <LinkButton href="https://google.com" size="small" variant="primary">
          label
        </LinkButton>
        <LinkButton
          href="https://google.com"
          size="small"
          variant="primary"
          disabled
        >
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
        <LinkButton
          href="https://google.com"
          size="small"
          variant="text"
          disabled
        >
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
