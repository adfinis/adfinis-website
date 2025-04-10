"use client"

import Image from "next/image"
import Triangle from "./triangle"
import clsx from "clsx"
import React from "react"
import { colors } from "@/lib/colors"
import { useNavContext } from "./nav-bar/nav-context"

type HeroProps = {
  color: keyof typeof colors
  imageUrl?: string
  children: React.ReactNode
  /**
   * @info when a logoUrl is passed, the triangle will turn always black with the logo on top.
   */
  logoUrl?: string
}

const Hero: React.FC<HeroProps> = ({ imageUrl, children, color, logoUrl }) => {
  const { navActive } = useNavContext()
  return (
    <div
      className={clsx([
        "relative min-h-[600px] lg:min-h-[750px] 2xl:min-h-[800px] 3xl:min-h-[900px] overflow-hidden",
        'before:content-[""] before:absolute',
        "before:left-0 before:right-0",
        "before:bottom-[-15vw] before:h-[15vw] ",
        "before:z-20 before:bg-white",
        "before:skew-y-6",
        "before:origin-bottom-right",
      ])}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero Image"
          width={1920}
          height={1080}
          className={clsx([
            "absolute inset-0 object-cover object-center z-0 h-full w-full",
          ])}
          priority
        />
      )}
      {
        navActive && <div className="absolute inset-0 backdrop-blur-sm z-10" /> // blur everything behind when nav is active
      }

      <div
        className={clsx([
          "absolute inset-0",
          "transition-all duration-150 bg-gradient-to-r from-stone/65 to-stone/10",
          { "bg-stone/80 z-10": navActive }, // darkens elements behind as overlay when nav active
        ])}
      />
      <Triangle
        color={logoUrl ? "stone" : color}
        className="w-[50vw] h-auto absolute right-0 bottom-0 z-10"
        fill={logoUrl ? true : undefined}
      />
      {logoUrl && (
        <div className="w-[50vw] h-max absolute right-0 bottom-0 block">
          <Triangle
            color="neutral"
            className="w-[50vw] h-auto opacity-0 pointer-events-none"
          />
          <Image
            src={logoUrl}
            alt=""
            aria-hidden="true"
            width={150}
            height={100}
            className="hidden md:block absolute top-0 right-0 bottom-0 w-auto h-full z-10"
          />
        </div>
      )}

      <section
        className="relative container px-4 mt-28 lg:mt-44"
        data-scheme="dark"
      >
        <div className="w-full lg:w-1/2">
          <div className="inline-grid gap-8 py-24 lg:py-16 items-center place-items-start text-shadow-md/10">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
