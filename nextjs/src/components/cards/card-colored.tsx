import React from "react"
import type { Card } from "./card"
import Text from "../text"
import Triangle from "../triangle"

const CardColored: React.FC<Card> = ({ color, title, description }) => {
  return (
    <article className="rounded-xl max-w-xs overflow-hidden bg-white h-full">
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
        <h3 className="text-neutral relative font-light z-10 text-30 leading-10 max-w-[50%]">
          {title}
        </h3>
      </header>
      <div className="p-6">
        <Text markdown={description} />
      </div>
    </article>
  )
}

export default CardColored
