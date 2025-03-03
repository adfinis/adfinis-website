import Link from "next/link"
import React from "react"
import IconArrowLongRight from "../icons/icon-arrow-long-right"

/**
 * @description A component that renders a title for the mobile navigation but makes it a link if a URL is provided.
 */
const NavMobileTitle: React.FC<{
  title: string
  url?: string
  children: React.ReactNode
  className?: string
}> = ({ title, url, className, children }) => {
  if (url) {
    return (
      <Link href={url} className={className}>
        {children} <IconArrowLongRight className="size-4" />
      </Link>
    )
  }
  return <h3 className={className}>{title}</h3>
}

export default NavMobileTitle
