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
      "both-padding": "px-4 lg:px-0 relative", // padding on both sides
    },
    background: {
      white: "bg-white border-t border-b border-jumbo/30",
      full_white: "bg-white",
      neutral: "bg-neutral",
      sapphire: "bg-gradient-to-br from-sapphire to-biscay",
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
      {/* 
      /**
       * @info sm:px-2 is an additional whitespace for the case that the device width has exactly the same
       * width as one of the tailwind CSS screens. This is to prevent the text from touching the edge of the screen.
       * 
       * @see tailwind.config.ts for the screen sizes
       * @see CardSlider.tsx for additional corrections
       */}
      <div
        className={clsx([padding === "both-padding" && "container sm:px-2"])}
      >
        {children}
      </div>
    </section>
  )
}

export default Container
