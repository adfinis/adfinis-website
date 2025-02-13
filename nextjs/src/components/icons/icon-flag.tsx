import React from "react"
import IconFlagAU from "./icon-flag-au"
import IconFlagDE from "./icon-flag-de"
import IconFlagUK from "./icon-flag-uk"
import IconFlagNL from "./icon-flag-nl"
import IconFlagUS from "./icon-flag-us"
import IconFlagCH from "./icon-flag-ch"

type IconFlagProps = {
  className?: string
  country: "ch" | "de" | "nl" | "au" | "us" | "uk"
}
/**
 * @see https://svgflags.com/
 */
const IconFlag: React.FC<IconFlagProps> = ({ className, country }) => {
  switch (country) {
    case "ch":
      return <IconFlagCH className={className} />
    case "de":
      return <IconFlagDE className={className} />
    case "nl":
      return <IconFlagNL className={className} />
    case "au":
      return <IconFlagAU className={className} />
    case "us":
      return <IconFlagUS className={className} />
    case "uk":
      return <IconFlagUK className={className} />
    default:
      return null
  }
}

export default IconFlag
