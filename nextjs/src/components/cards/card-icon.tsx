import { CTA } from "@/lib/cta"
import Image from "next/image"
import React from "react"
import Title from "../title"
import Text from "../text"
import Link from "../link"
import clsx from "clsx"

type CardIconProps = {
  icon: {
    src: string
    alt: string
  }
  title: string
  description: string
  cta: CTA
}

/**
 * @description Component with a large "icon" image.
 */
const CardIcon: React.FC<CardIconProps> = ({
  icon,
  title,
  description,
  cta,
}) => {
  return (
    <div
      className={clsx([
        "rounded-xl px-6 pt-6 pb-8 shadow-2 grid gap-6 divide-vertical-6 justify-items-center",
        // Shared CSS for divider
        "relative after:content-[''] after:absolute last:after:hidden after:bg-jumbo/30",
        // Mobile specific
        "after:top-auto after:-bottom-6 after:right-0 after:left-0 after:w-full after:h-[1px]",
        // Desktop specific
        "lg:after:top-0 lg:after:-right-6 lg:after:w-[1px] lg:after:h-full lg:after:left-auto",
      ])}
    >
      <Image
        alt={icon.alt}
        src={icon.src}
        width={300}
        height={300}
        className="max-h-20"
      />
      <Title level={3} boldness={"semibold"} align={"center"}>
        {title}
      </Title>
      <Text markdown={description} className="text-center " />
      <Link
        href={cta.href}
        variant={"secondary"}
        size={"small"}
        className="px-4"
      >
        {cta.text}
      </Link>
    </div>
  )
}
export default CardIcon
