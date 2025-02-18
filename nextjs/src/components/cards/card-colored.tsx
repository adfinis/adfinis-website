import React from "react"
import type { Card } from "./card"
import Text from "../text"
import Triangle from "../triangle"
import type { colors } from "@/lib/colors"
import IconArrowLongRight from "../icons/icon-arrow-long-right"
import Link from "next/link"
import clsx from "clsx"

interface CardColoredProps extends Card {
  color?: keyof typeof colors
  href?: string
}

/**
 * @description card for different colored triangles.
 * The triangle color represents in general an Adfinis "cloud journey". Each journey has a different unique color.
 * The journey-color mapping is done in the backend.
 */
const CardColored: React.FC<CardColoredProps> = ({
  color,
  title,
  description,
  href,
}) => {
  return (
    <article className="rounded-xl shadow-2 max-w-xs overflow-hidden bg-white h-full relative group">
      <header
        className="bg-sapphire relative h-[200px] flex items-center px-6 overflow-hidden
        before:content-[''] before:absolute
        before:left-0 before:right-0
        before:bottom-[-15vw] before:h-[15vw]
        before:z-10 before:bg-white
        before:skew-y-6
        before:origin-bottom-right
"
      >
        <Triangle
          color={color || "cinnamon"}
          className="w-1/2 h-auto absolute right-0 bottom-0"
        />
        <h3 className="text-neutral relative font-light z-10 text-30 leading-10 max-w-[80%]">
          <span
            className={clsx(
              href && [
                "transition-all duration-300 ease-out cursor-pointer",
                "lg:bg-gradient-to-r from-white to-white",
                "lg:bg-left-bottom bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px]",
              ],
            )}
          >
            {title}
          </span>
        </h3>
      </header>
      <div className="p-6">
        <Text markdown={description} />
      </div>

      {href && (
        <>
          <IconArrowLongRight className="absolute size-6 right-4 bottom-2 text-sapphire transform transition-all group-hover:translate-x-2" />
          <Link href={href} className="absolute inset-0 z-10">
            <span className="sr-only">{title}</span>
          </Link>
        </>
      )}
    </article>
  )
}

export default CardColored
