import React from "react"
import { Card } from "./card"
import Image from "next/image"
import Text from "../text"

interface CardPortraitProps extends Card {}

const CardPortrait: React.FC<CardPortraitProps> = ({
  imageUrl,
  description,
  title,
}) => {
  return (
    <div className="grid gap-6 lg:flex">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={320}
          height={320}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover object-center rounded-full"
        />
      ) : (
        // placeholder for large screens (due to flex.)
        <div className="lg:w-36 lg:h-36" />
      )}
      <Text className="flex-1" markdown={description} />
    </div>
  )
}

export default CardPortrait
