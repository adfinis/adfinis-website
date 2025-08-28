"use client"

import React, { useState } from "react"
import { Card } from "./card"
import Image from "next/image"
import "./card-member.css"
import clsx from "clsx"
import { colors } from "@/lib/colors"

interface CardMemberProps extends Card {
  imageUrl2?: string
}
const CardMember: React.FC<CardMemberProps> = ({
  title,
  description,
  imageUrl,
  imageUrl2,
}) => {
  const [active, setActive] = useState(false)

  return (
    <div
      className="relative aspect-2/3 overflow-hidden rounded-lg"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* the image url after reveal */}
      {imageUrl2 && (
        <Image
          className={clsx([
            "absolute inset-0 w-full h-3/4 object-cover object-center",
            { "image-reveal opacity-100 z-10": active },
          ])}
          src={imageUrl2}
          alt={title}
          height={400}
          width={300}
        />
      )}

      {/* the image url initially in front */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          height={400}
          width={300}
          className={clsx([
            "absolute inset-0 w-full h-3/4 object-cover object-center",
            "grayscale",
            { "image-hide": !active },
          ])}
        />
      )}

      <div className="absolute left-0 bottom-0 right-0 h-1/3 z-20 bg-sapphire grid content-center text-center text-white pb-2 md:pb-3">
        <svg
          width="1440"
          height="150"
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto z-30 absolute top-0 left-0 right-0 bottom-auto -translate-y-3/4"
        >
          <g clipPath="url(#clip-member-shape)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 150V0L1440 150H0Z"
              fill={colors.sapphire}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1440 150.067V0.0665283L744 150.067H1440Z"
              fill={colors.sapphire}
            />
          </g>
          <defs>
            <clipPath id="clip-member-shape">
              <rect width="1440" height="150" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h3 className="text-18 sm:text-22 lg:text-25">{title}</h3>
        <p className="text-14 sm:text-16 lg:text-18">{description}</p>
      </div>
    </div>
  )
}

export default CardMember
