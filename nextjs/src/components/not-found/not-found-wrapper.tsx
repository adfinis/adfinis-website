"use client"
import React from "react"
import GameWrapper from "@/components/not-found/game-wrapper"
import "./not-found.css"
import { LinkedLocale } from "../nav-bar/linked-locales-provider"
import HeroWrapper from "../stapi/hero-wrapper"
import { useParams } from "next/navigation"
import { getDictionary } from "@/lib/get-dictionary.client"
import { Locale } from "@/lib/locale"
import SectionCTA from "@/components/sections/section-cta"
import Container from "@/components/container"

interface NotFoundWrapperProps {
  locales: LinkedLocale[]
}

const NotFoundWrapper: React.FC<NotFoundWrapperProps> = ({ locales }) => {
  const params: { locale: Locale } = useParams()
  const dictionary = getDictionary(params.locale || "en")
  return (
    <>
      <HeroWrapper
        hero={{
          background_image: { url: "/hero-404.jpg" },
          color: { color: "white" },
          body: dictionary.pages.notFound.body,
          cta: {
            href: "/en/contact",
            label: dictionary.pages.notFound.cta,
            variant: "cta",
          },
        }}
      />
      <GameWrapper />
      <Container background="sapphire">
        <SectionCTA
          body={dictionary.pages.notFound.stayInTouch}
          socials={true}
        />
      </Container>
    </>
  )
}

export default NotFoundWrapper
