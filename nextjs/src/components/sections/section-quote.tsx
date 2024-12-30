import clsx from "clsx"
import Image from "next/image"
import React from "react"

type SectionQuoteProps = {
  author?: string
  quote?: string
  image?: {
    url: string
    alt?: string
  }
}
const SectionQuote: React.FC<SectionQuoteProps> = ({
  author,
  quote,
  image,
}) => {
  return (
    <div className="pr-12 sm:px-16 lg:px-32">
      <div className="relative max-w-4xl mx-auto mb-30">
        <blockquote
          className={clsx([
            "bg-sapphire font-extralight italic text-neutral leading-tight",
            "text-22 p-4",
            "md:p-8 md:text-30",
            "lg:p-12 lg:pr-24 lg:pb-14 lg:text-35",
            "xl:pb-16",
          ])}
        >
          {quote}
          <svg
            height="64"
            viewBox="0 0 143 64"
            width="143"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx([
              "text-sapphire absolute",
              "right-6 -bottom-7 h-8",
              "md:h-12 md:right-20 md:-bottom-10",
              "lg:h-16 lg:right-40 lg:-bottom-15",
            ])}
          >
            <path
              d="m0 0 141.458 62.6-11.73-62.6z"
              fill="currentColor"
              fillRule="evenodd"
              transform="translate(.626 .581)"
            />
          </svg>
        </blockquote>

        {image && (
          <div
            className={clsx([
              "absolute",
              "-right-12 -bottom-12 w-24 h-24",
              "md:-right-20 md:-bottom-20 md:w-40 md:h-40",
              "lg:-right-30 lg:-bottom-30 lg:w-60 lg:h-60",
            ])}
          >
            <Image
              className={clsx([
                "rounded-full aspect-square object-cover object-center",
                "w-24 h-24",
                "md:w-40 md:h-40",
                "lg:w-60 lg:h-60",
              ])}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
              alt={image.alt || author || ""}
              width={240}
              height={240}
            />
          </div>
        )}
        {author && (
          <p
            className={clsx([
              "absolute w-full h-[20px] text-right",
              "pr-30 -bottom-8 text-16",
              "sm:pr-30 sm:-bottom-8 sm:text-20",
              "md:pr-40",
              "lg:-bottom-24 lg:pr-30",
            ])}
          >
            {author}
          </p>
        )}
      </div>
    </div>
  )
}

export default SectionQuote
