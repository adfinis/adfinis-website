import React from "react"

import type { Card } from "./card"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

interface CardArticleProps extends Card {
  subtitle?: string
  categories?: {
    text: string
    href: string
  }[]
  logoUrl?: string
}

const CardArticle: React.FC<CardArticleProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  logoUrl,
  categories,
}) => (
  <article
    className="relative rounded-xl min-w-80 lg:min-w-112 overflow-hidden bg-white h-100 shadow-2"
    data-component="CardArticle"
  >
    {imageUrl && (
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
        className={clsx([
          "w-full z-0 inset-0 absolute h-full object-cover object-center",
          logoUrl ? "mt-24" : "mt-12",
        ])}
      />
    )}
    <div
      className={clsx([
        "w-full bg-white flex items-center gap-2 px-6",
        logoUrl ? "h-24 justify-end" : "h-12",
      ])}
    >
      {categories?.map((category, index) => (
        <Link
          className="leading-none text-12 font-semibold tracking-wider uppercase text-sapphire"
          key={index}
          href={category.href}
        >
          {category.text}
        </Link>
      ))}
      {logoUrl && (
        <Image
          src={logoUrl}
          alt={title}
          height={50}
          width={200}
          className="max-h-18 w-auto"
        />
      )}
    </div>
    <header className="absolute bottom-6 left-0 grid gap-4 right-6 p-6 bg-sapphire">
      <h3 className="text-white font-bold text-18">
        {title}
        {subtitle && (
          <>
            <br />
            <span className="font-light">{subtitle}</span>
          </>
        )}
      </h3>

      <span className="text-12 uppercase text-white font-semibold tracking-wider">
        {description}
      </span>
    </header>
  </article>
)
export default CardArticle
