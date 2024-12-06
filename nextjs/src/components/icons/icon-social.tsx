import React from "react"

import IconLinked from "./icon-linkedin"
import IconGithub from "./icon-github"
import IconYoutube from "./icon-youtube"

type IconSocialProps = {
  type: "linkedin" | "github" | "youtube"
}

const IconSocial: React.FC<IconSocialProps> = ({ type }) => {
  switch (type) {
    case "linkedin":
      return <IconLinked />
    case "github":
      return <IconGithub />
    case "youtube":
      return <IconYoutube />
  }
}

export default IconSocial
