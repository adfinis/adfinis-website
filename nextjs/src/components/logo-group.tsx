import Image from "next/image"
import React from "react"

type LogoGroupProps = {
  logos: {
    src: string
    alt: string
  }[]
}

const LogoGroup: React.FC<LogoGroupProps> = ({ logos }) => {
  return (
    <div className="flex pb-4 lg:pb-0 overflow-x-auto lg:grid lg:grid-cols-4 gap-6 lg:gap-12 justify-items-center items-center max-w-4xl">
      {logos.map((logo, key) => (
        <Image
          className="max-h-8"
          width={150}
          height={128}
          key={key}
          src={logo.src}
          alt={logo.alt}
          objectPosition="center"
          objectFit="cover"
        />
      ))}
    </div>
  )
}

export default LogoGroup
