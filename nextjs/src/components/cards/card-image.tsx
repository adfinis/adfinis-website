import Image from "next/image"
import React from "react"

type CardImageProps = {
  src: string
  alt: string
  className?: string
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className }) => {
  return (
    <Image
      className={`!relative rounded-xl` + (className ? ` ${className}` : "")}
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
    />
  )
}

export default CardImage
