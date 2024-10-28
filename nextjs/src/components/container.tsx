import React, { useId } from "react"

import type { colors } from "@/lib/colors"
import { cva } from "class-variance-authority"

type BackgroundOptions = keyof typeof colors
type PickStringLiteral<A, B extends A> = B

const backgroundStyles = cva(["py-18 lg:py-24"], {
  variants: {
    padding: {
      "no-padding": "px-0",
      "both-padding": "px-2 lg:px-0",
      "start-padding": "pl-2 rtl:pr-2 rtl:pl-0",
    },
    background: {
      white: "bg-white",
      neutral: "bg-neutral",
      sapphire: "bg-sapphire",
      stone: "bg-stone",
    },
  },
})
type ContainerProps = {
  children: React.ReactNode
  id?: string
  background: PickStringLiteral<
    BackgroundOptions,
    "white" | "neutral" | "sapphire" | "stone"
  >
  padding: "no-padding" | "both-padding" | "start-padding"
}

const Container: React.FC<ContainerProps> = ({
  background,
  children,
  id,
  padding = "both-padding",
}) => {
  const fallbackId = useId()
  return (
    <section id={id || fallbackId} className={backgroundStyles({ background })}>
      {children}
    </section>
  )
}

export default Container
