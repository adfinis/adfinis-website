import React from "react"

import { type Card } from "./card"
import clsx from "clsx"
import Text from "../text"

type CardMessageProps = Omit<Card, "imageUrl">

/**
 * @description Card with rounded corners.
 * The <header> represents a speech bubble and contains the title.
 * The description is placed below the speech bubble.
 */
export const CardMessage: React.FC<CardMessageProps> = ({
  title,
  description,
}) => {
  return (
    <article className="rounded-xl shadow-2 overflow-hidden max-w-xs bg-white h-full grid gap-6 content-start">
      <header>
        {/* Square that represents the speech bubble rectangle */}
        <div className="w-full p-6 bg-sapphire">
          <h3
            className={clsx([
              "text-neutral font-light text-30 leading-10",
              "min-h-24 flex items-end",
            ])}
          >
            {title}
          </h3>
        </div>

        {/* SVG Triangle that represents the speech bubble tail and adheres below the speech bubble rectangle */}
        <svg
          height="30"
          viewBox="0 0 87 30"
          width="87"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 ml-8 h-auto text-sapphire"
        >
          <path
            d="m86.6130148-0-86.42299998 29.962 7.1666-29.962h-34.35661482z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </header>
      <div className="p-6">
        <Text markdown={description} />
      </div>
    </article>
  )
}
