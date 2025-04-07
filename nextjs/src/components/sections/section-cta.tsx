import { CTA } from "@/lib/cta"
import React from "react"
import Text from "../text"
import LinkButton from "../link-button"
import SocialsGroup from "../socials-group"

type SectionCTAProps = {
  body?: string
  cta?: CTA
  /**
   * @info If true, the socials will be displayed instead of the button.
   */
  socials?: boolean
}
const SectionCTA: React.FC<SectionCTAProps> = ({ body, cta, socials }) => {
  return (
    <div className="max-w-4xl mx-auto grid gap-4 lg:gap-8">
      {body && <Text markdown={body} className="text-center" />}
      {cta && !socials && (
        <LinkButton
          href={cta.href}
          variant={cta.variant}
          size={cta.size}
          className="place-self-center"
        >
          {cta.label}
        </LinkButton>
      )}
      {socials && <SocialsGroup />}
    </div>
  )
}

export default SectionCTA
