import React from "react"
import { draftMode } from "next/headers"

const FooterLegal = async () => {
  const { isEnabled } = await draftMode()

  return (
    <span className="text-14">
      &copy; {new Date().getFullYear()} Adfinis.
      {isEnabled && (
        <a
          href="/api/draft/disable"
          className="ml-2 font-bold underline hover:no-underline"
          title="Click to disable preview mode"
        >
          PREVIEW-MODE
        </a>
      )}
    </span>
  )
}

export default FooterLegal
