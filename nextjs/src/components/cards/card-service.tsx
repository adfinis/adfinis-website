import { CTA } from "@/lib/cta"
import Image from "next/image"
import React from "react"
import Title from "../title"
import type { Card } from "./card"
import IconCheck from "../icons/icon-check"

interface CardServicesProps extends Card {
  usps: {
    text: string
    active: boolean
  }[]
}

/**
 * @description Component with a list of active or inactive services.
 */
const CardIcon: React.FC<CardServicesProps> = ({
  title,
  description,
  usps,
}) => {
  return (
    <div className="rounded-xl px-6 pt-6 pb-8 shadow-2 grid gap-6 justify-items-stretch max-w-sm">
      <Title level={3} boldness={"semibold"} align={"center"}>
        {title}
      </Title>
      {description && <p>{description}</p>}
      {usps.map((usp, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${!usp.active && "opacity-30"}`}
        >
          <IconCheck className="text-white rounded-full p-[2px] h-4 w-4 bg-sapphire mt-[6px] lg:mt-1" />
          <span className="flex-1 text-20 lg:text-18 text-stone">
            {usp.text}
          </span>
        </div>
      ))}
    </div>
  )
}
export default CardIcon
