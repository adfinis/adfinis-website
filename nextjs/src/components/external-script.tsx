import clsx from "clsx"
import React from "react"

interface ExternalScriptProps {
  html: string
  className?: string
}

/**
 * @info .external-script is a css component class that is still overridable by className prop
 */
const ExternalScript: React.FC<ExternalScriptProps> = ({ html, className }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(["external-script", className])}
    />
  )
}

export default ExternalScript
