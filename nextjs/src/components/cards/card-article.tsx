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
  href?: string
}

const CardArticle: React.FC<CardArticleProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  logoUrl,
  categories,
  href,
}) => {
  const CardTitleTag = href ? Link : "h3"
  return (
    /**
     * @info lg:min-w-72 should not be increased since the element would overflow the CardGroup grid.
     */
    <article
      className="relative rounded-xl min-w-80 lg:min-w-72 overflow-hidden bg-white h-100 shadow-2"
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
            className={clsx([
              "leading-none text-12 font-semibold tracking-wider uppercase text-sapphire",
              "hover:underline decoration-sapphire/50 underline-offset-2 decoration-2",
            ])}
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
      <header className="absolute bottom-6 left-0 grid gap-4 right-6">
        <div className="relative grid gap-4 p-6 bg-sapphire">
          <CardTitleTag
            href={href!}
            className={clsx([
              "text-white font-bold text-18",
              {
                "cursor-pointer hover:underline decoration-neutral/50 decoration-2 underline-offset-2":
                  href,
              },
            ])}
          >
            {title}
            {subtitle && (
              <>
                <br />
                <span className="font-light">{subtitle}</span>
              </>
            )}
          </CardTitleTag>

          <span className="text-12 uppercase text-white font-semibold tracking-wider">
            {description}
          </span>
        </div>
      </header>
    </article>
  )
}
export default CardArticle
