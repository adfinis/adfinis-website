import React from "react"

import IconLinked from "./icon-linkedin"
import IconGithub from "./icon-github"
import IconYoutube from "./icon-youtube"

type IconSocialProps = {
  type: "linkedin" | "github" | "youtube"
  className?: string
}

const IconSocial: React.FC<IconSocialProps> = ({ type, className }) => {
  switch (type) {
    case "linkedin":
      return <IconLinked className={className} />
    case "github":
      return <IconGithub className={className} />
    case "youtube":
      return <IconYoutube className={className} />
  }
}

export default IconSocial
