"use client"

import Image from "next/image"
import Triangle from "./triangle"
import clsx from "clsx"
import React from "react"
import { colors } from "@/lib/colors"
import { useNavContext } from "./nav-bar/nav-context"

type HeroProps = {
  color: keyof typeof colors
  imageUrl: string
  children: React.ReactNode
}

const Hero: React.FC<HeroProps> = ({ imageUrl, children, color }) => {
  const { navActive } = useNavContext()
  return (
    <div
      className={clsx([
        "relative min-h-[600px] lg:min-h-[max(75vh,700px)] overflow-hidden",
        'before:content-[""] before:absolute',
        "before:left-0 before:right-0",
        "before:bottom-[-15vw] before:h-[15vw] ",
        "before:z-10 before:bg-white",
        "before:skew-y-6",
        "before:origin-bottom-right",
      ])}
    >
      <Image
        src={imageUrl}
        alt="Hero Image"
        width={1920}
        height={1080}
        className={clsx([
          "absolute inset-0 object-cover object-center z-0 h-full w-full",
          "transition-all duration-75",
          {
            "blur-sm": navActive,
          },
        ])}
      />
      <div
        className={clsx([
          "z-0 absolute inset-0 bg-gradient-to-r from-stone/50 to-stone/0",
          "transition-all duration-75",
          { "bg-stone/90": navActive },
        ])}
      />
      <Triangle
        color={color}
        className="w-[50vw] h-auto absolute right-0 bottom-0"
      />
      <section
        className={clsx([
          "relative container px-4 lg:px-0 mt-28 lg:mt-44",
          "transition-all duration-75",
          {
            "blur-sm": navActive,
          },
        ])}
        data-scheme="dark"
      >
        <div className="w-full lg:w-1/2">
          <div className="inline-grid gap-8 py-24 lg:py-16 items-center place-items-start">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
