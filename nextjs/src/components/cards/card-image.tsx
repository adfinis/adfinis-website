import { colors } from "@/lib/colors"
import Image from "next/image"
import React from "react"
import Triangle from "../triangle"

type CardImageProps = {
  src: string
  alt: string
  className?: string
  color?: keyof typeof colors
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  color,
}) => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <Image
        className={`object-cover object-center ${className || ""}`}
        src={src}
        alt={alt}
        width={800}
        height={400}
      />
      {color && (
        <Triangle
          color={color}
          className="absolute right-0 bottom-0 w-[66%] h-auto"
        />
      )}
    </div>
  )
}

export default CardImage
