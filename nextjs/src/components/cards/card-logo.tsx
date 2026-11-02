import React from "react"
import { type Card } from "./card"

interface CardLogoProps {
  title: string
  imageUrl: string
}

const CardLogo: React.FC<CardLogoProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 max-w-96 grid aspect-video">
      <img
        loading="lazy"
        className="self-center w-full h-auto"
        src={imageUrl}
        alt={title || ""}
        width={250}
        height={80}
      />
    </div>
  )
}

export default CardLogo
