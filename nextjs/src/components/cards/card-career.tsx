import React from "react"
import type { Card } from "./card"
import Text from "../text"
import Triangle from "../triangle"
import Image from "next/image"
import IconFlag from "../icons/icon-flag"
import Title from "../title"
import Link from "next/link"
import { type Country } from "../icons/icon-flag"

interface CardCareer extends Card {
  workload?: string
  location?: string
  href: string
  country: Country
}

/**
 * @description card for different colored triangles.
 * The triangle color represents in general an Adfinis "cloud journey". Each journey has a different unique color.
 * The journey-color mapping is done in the backend.
 */
const CardCareer: React.FC<CardCareer> = ({
  title,
  description,
  imageUrl,
  workload,
  location,
  country,
  href,
}) => {
  return (
    <Link href={href}>
      <article className="rounded-xl shadow-2 overflow-hidden bg-white h-full lg:min-h-[400px] flex flex-col">
        <header
          className="relative h-[200px] lg:h-[300px] flex items-center px-6 overflow-hidden
        before:content-[''] before:absolute
        before:left-0 before:right-0
        before:bottom-[-15vw] before:h-[15vw]
        before:z-10 before:bg-white
        before:skew-y-6
        before:origin-bottom-right
"
        >
          <Triangle
            color="white"
            className="w-1/2 h-auto absolute right-0 bottom-0 z-10"
          />
          {imageUrl && (
            <Image
              role="presentation"
              className="absolute left-0 top-0 right-0 w-full h-[200px] lg:h-[300px] object-cover"
              width="200"
              height="100"
              src={imageUrl}
              alt={title}
            />
          )}
        </header>
        <div className="p-6 flex-1">
          <Title level={3} className="mb-4">
            {title}
          </Title>
          <Text markdown={description} />
        </div>
        {Boolean(workload || location || country) && (
          <footer className="bg-sapphire text-neutral text-14 uppercase font-semibold tracking-wider px-6 py-3 flex justify-between items-center">
            <span>{workload}</span>
            <span className="flex items-center gap-4">
              <span>{location}</span>
              {country && (
                <IconFlag
                  country={country}
                  className="w-8 h-8 lg:w-10 lg:h-10 border border-white rounded-full flex-shrink-0"
                />
              )}
            </span>
          </footer>
        )}
      </article>
    </Link>
  )
}

export default CardCareer
