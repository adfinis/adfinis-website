import Button from "@/components/button"

export default function Theme() {
  return (
    <main className="bg-neutral">
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
        <Button link="https://google.com" size="large" type="cta">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="cta">
          label
        </Button>
        <Button link="https://google.com" size="large" type="cta" disabled>
          label
        </Button>
        <Button link="https://google.com" size="large" type="primary">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="primary">
          label
        </Button>
        <Button link="https://google.com" size="large" type="primary" disabled>
          label
        </Button>
        <Button link="https://google.com" size="large" type="secondary">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="secondary">
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="secondary"
          disabled
        >
          label
        </Button>
      </div>
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
        <Button link="https://google.com" size="large" type="text">
          text - large
        </Button>
        <Button link="https://google.com" size="large" type="text">
          label
        </Button>
        <Button link="https://google.com" size="large" type="text" disabled>
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
        >
          text - large
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="right"
        >
          text - large
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
        <Button link="https://google.com" size="small" type="cta">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="cta">
          label
        </Button>
        <Button link="https://google.com" size="small" type="cta" disabled>
          label
        </Button>
        <Button link="https://google.com" size="small" type="primary">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="primary">
          label
        </Button>
        <Button link="https://google.com" size="small" type="primary" disabled>
          label
        </Button>
        <Button link="https://google.com" size="small" type="secondary">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="secondary">
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="secondary"
          disabled
        >
          label
        </Button>
      </div>
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
        <Button link="https://google.com" size="small" type="text">
          text - small
        </Button>
        <Button link="https://google.com" size="small" type="text">
          label
        </Button>
        <Button link="https://google.com" size="small" type="text" disabled>
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
        >
          text - small
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="right"
        >
          text - small
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
      {/* Dark Theme */}
      <div
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
        data-scheme="dark"
      >
        <Button link="https://google.com" size="large" type="cta">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="cta">
          label
        </Button>
        <Button link="https://google.com" size="large" type="cta" disabled>
          label
        </Button>
        <Button link="https://google.com" size="large" type="primary">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="primary">
          label
        </Button>
        <Button link="https://google.com" size="large" type="primary" disabled>
          label
        </Button>
        <Button link="https://google.com" size="large" type="secondary">
          CTA - large
        </Button>
        <Button link="https://google.com" size="large" type="secondary">
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="secondary"
          disabled
        >
          label
        </Button>
      </div>
      <div
        data-scheme="dark"
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
      >
        <Button link="https://google.com" size="large" type="text">
          text - large
        </Button>
        <Button link="https://google.com" size="large" type="text">
          label
        </Button>
        <Button link="https://google.com" size="large" type="text" disabled>
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
        >
          text - large
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="right"
        >
          text - large
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="large"
          type="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>

      <div
        data-scheme="dark"
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
      >
        <Button link="https://google.com" size="small" type="cta">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="cta">
          label
        </Button>
        <Button link="https://google.com" size="small" type="cta" disabled>
          label
        </Button>
        <Button link="https://google.com" size="small" type="primary">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="primary">
          label
        </Button>
        <Button link="https://google.com" size="small" type="primary" disabled>
          label
        </Button>
        <Button link="https://google.com" size="small" type="secondary">
          CTA - small
        </Button>
        <Button link="https://google.com" size="small" type="secondary">
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="secondary"
          disabled
        >
          label
        </Button>
      </div>
      <div
        data-scheme="dark"
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
      >
        <Button link="https://google.com" size="small" type="text">
          text - small
        </Button>
        <Button link="https://google.com" size="small" type="text">
          label
        </Button>
        <Button link="https://google.com" size="small" type="text" disabled>
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
        >
          text - small
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="left"
          disabled
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="right"
        >
          text - small
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          chevron="right"
        >
          label
        </Button>
        <Button
          link="https://google.com"
          size="small"
          type="text"
          disabled
          chevron="right"
        >
          label
        </Button>
      </div>
    </main>
  )
}
