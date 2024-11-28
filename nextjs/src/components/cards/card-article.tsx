import React from "react"

import type { Card } from "./card"
import Link from "next/link"
import Image from "next/image"

interface CardArticleProps extends Card {
  categories?: {
    text: string
    href: string
  }[]
}

const CardArticle: React.FC<CardArticleProps> = ({
  title,
  description,
  imageUrl,
  categories,
}) => (
  <article
    className="relative rounded-xl w-80 lg:w-112 overflow-hidden bg-white h-100 shadow-2"
    data-component="CardArticle"
  >
    {imageUrl && (
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
        className="w-full mt-12 z-0 inset-0 absolute h-full object-cover object-center"
      />
    )}
    <div className="w-full h-12 bg-white flex items-center gap-2 px-6">
      {categories?.map((category, index) => (
        <Link
          className="leading-none text-12 font-semibold tracking-wider uppercase text-sapphire"
          key={index}
          href={category.href}
        >
          {category.text}
        </Link>
      ))}
    </div>
    <header className="absolute bottom-6 left-0 grid gap-5 right-6 p-6 bg-sapphire">
      <h3 className="text-white font-bold text-18">{title}</h3>
      <span className="text-12 uppercase text-white font-semibold tracking-wider">
        {description}
      </span>
    </header>
  </article>
)
export default CardArticle
