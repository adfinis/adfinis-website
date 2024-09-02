"use client"
import Button from "@/components/button"
import Link from "@/components/link"

export default function Theme() {
  const handleClick = () => {
    console.log("Button clicked!")
    alert("Button clicked!")
  }

  return (
    <main className="bg-neutral">
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
        <h1 className="text-40 font-bold col-span-3 text-razzmatazz">
          Buttons
        </h1>
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
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
      <div
        data-scheme="light"
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3"
      >
        <h1 className="text-40 font-bold col-span-3 text-razzmatazz">Links</h1>
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
      <div className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3">
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-biscay"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
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
        className="container p-8 grid max-w-screen-lg mx-auto place-items-start gap-12 grid-cols-3 bg-stone"
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
