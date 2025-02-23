import React from "react"
import IconFlagAU from "./icon-flag-au"
import IconFlagCH from "./icon-flag-ch"
import IconFlagDE from "./icon-flag-de"
import IconFlagEG from "./icon-flag-eg"
import IconFlagNL from "./icon-flag-nl"
import IconFlagNZ from "./icon-flag-nz"
import IconFlagUK from "./icon-flag-uk"
import IconFlagUS from "./icon-flag-us"

export type Country = "au" | "ch" | "de" | "eg" | "nl" | "nz" | "uk" | "us"

type IconFlagProps = {
  className?: string
  country: Country
}
/**
 * @see https://svgflags.com/
 */
const IconFlag: React.FC<IconFlagProps> = ({ className, country }) => {
  switch (country) {
    case "au":
      return <IconFlagAU className={className} />
    case "ch":
      return <IconFlagCH className={className} />
    case "de":
      return <IconFlagDE className={className} />
    case "eg":
      return <IconFlagEG className={className} />
    case "nl":
      return <IconFlagNL className={className} />
    case "nz":
      return <IconFlagNZ className={className} />
    case "uk":
      return <IconFlagUK className={className} />
    case "us":
      return <IconFlagUS className={className} />

    default:
      return null
  }
}

export default IconFlag
