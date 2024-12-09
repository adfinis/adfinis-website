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
    <div className="rounded-xl px-6 pt-6 pb-8 shadow-2 grid gap-6 divide-vertical-6 justify-items-center">
      {imageUrl && (
        <Image
          alt={title}
          src={imageUrl}
          width={300}
          height={300}
          className="max-h-20"
        />
      )}
      <Title level={3} boldness={"semibold"} align={"center"}>
        {title}
      </Title>
      <Text markdown={description} className="text-center " />
      {cta && (
        <Link
          href={cta.href}
          variant={"secondary"}
          size={"small"}
          className="px-4"
        >
          {cta.text}
        </Link>
      )}
    </div>
  )
}
export default CardIcon
