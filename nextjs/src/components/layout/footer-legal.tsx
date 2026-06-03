import React from "react"
import { draftMode } from "next/headers"

const FooterLegal = async () => {
  const { isEnabled } = await draftMode()

  return (
    <span className="text-14">
      &copy; {new Date().getFullYear()} Adfinis.
      {isEnabled && <strong className="ml-2 font-bold">PREVIEW-MODE</strong>}
    </span>
  )
}

export default FooterLegal
