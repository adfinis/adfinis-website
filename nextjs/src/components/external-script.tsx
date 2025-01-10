import React from "react"

interface ExternalScriptProps {
  html: string
  className?: string
}

const ExternalScript: React.FC<ExternalScriptProps> = ({ html, className }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className={className} />
  )
}

export default ExternalScript
