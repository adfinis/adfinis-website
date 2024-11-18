import React, { useId } from "react"

import type { colors } from "@/lib/colors"
import { cva, VariantProps } from "class-variance-authority"
import clsx from "clsx"

type BackgroundOptions = keyof typeof colors
type PickStringLiteral<A, B extends A> = B

const containerStyles = cva(["py-18 lg:py-24"], {
  variants: {
    padding: {
      "no-padding": "px-0", // edge-to-edge
      "both-padding": "px-4 lg:px-0", // padding on both sides
      "start-padding": "pl-4 rtl:pr-4 rtl:pl-0", // padding on the start side, i.e. for sliders
    },
    background: {
      white: "bg-white",
      neutral: "bg-neutral",
      sapphire: "bg-sapphire",
      stone: "bg-gradient-to-r bg-stone from-neutral/20 via-stone to-stone",
    },
  },
})
type ContainerProps = VariantProps<typeof containerStyles> & {
  children: React.ReactNode
  id?: string
  background: PickStringLiteral<
    BackgroundOptions,
    "white" | "neutral" | "sapphire" | "stone"
  >
}

const Container: React.FC<ContainerProps> = ({
  background,
  children,
  id,
  padding = "both-padding",
}) => {
  const fallbackId = useId()
  const isDark = ["sapphire", "stone"].includes(background)
  return (
    <section
      id={id || fallbackId}
      className={containerStyles({ background, padding })}
      data-scheme={isDark ? "dark" : "light"}
    >
      <div className={clsx([padding === "both-padding" && "container"])}>
        {children}
      </div>
    </section>
  )
}

export default Container
