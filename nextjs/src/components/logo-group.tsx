import clsx from "clsx"
import Image from "next/image"
import React from "react"

type LogoGroupProps = {
  logos: {
    src: string
    alt: string
  }[]
  columns?: 4 | "auto"
}

const LogoGroup: React.FC<LogoGroupProps> = ({ logos, columns = 4 }) => {
  return (
    <div
      className={clsx([
        "flex pb-4 lg:pb-0 overflow-x-auto gap-6 lg:gap-12 justify-items-center items-center",
        {
          "lg:grid lg:grid-cols-4": columns === 4,
          "lg:flex-wrap": columns === "auto",
        },
      ])}
    >
      {logos.map((logo, key) => (
        <Image
          className="max-h-8"
          width={150}
          height={128}
          key={key}
          src={logo.src}
          alt={logo.alt}
        />
      ))}
    </div>
  )
}

export default LogoGroup
