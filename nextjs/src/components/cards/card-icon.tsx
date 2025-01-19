import { CTA } from "@/lib/cta"
import Image from "next/image"
import React from "react"
import Title from "../title"
import Text from "../text"
import Link from "../link-button"

import type { Card } from "./card"

interface CardIconProps extends Card {
  cta?: CTA
}

/**
 * @description Component with a large "icon" image.
 */
const CardIcon: React.FC<CardIconProps> = ({
  imageUrl,
  title,
  description,
  cta,
}) => {
  return (
    <div
      data-component="CardIcon"
      className="bg-white rounded-xl px-6 pt-6 pb-8 shadow-2 flex flex-col justify-items-center gap-6 content-start"
      data-scheme="light"
    >
      {imageUrl && (
        <Image
          alt={title}
          src={imageUrl}
          width={300}
          height={300}
          className="h-18 mx-auto"
        />
      )}
      <Title level={3} boldness={"semibold"} align={"center"}>
        {title}
      </Title>
      <Text
        markdown={description}
        className="text-center self-start flex-grow"
      />
      {cta && (
        <Link
          href={cta.href}
          variant={"secondary"}
          size={"small"}
          className="px-4 self-center place-self-end"
        >
          {cta.text}
        </Link>
      )}
    </div>
  )
}
export default CardIcon
