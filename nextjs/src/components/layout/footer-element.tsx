import React from "react"
import Title from "../title"
import Text from "../text"
import Link from "next/link"

type FooterElementProps = {
  title: string
  text?: string
  children?: React.ReactNode
  links?: { href: string; text: string }[]
}
const FooterElement: React.FC<FooterElementProps> = ({
  title,
  text,
  links,
  children,
}) => {
  return (
    <div className="grid gap-4 content-start text-14 leading-6 font-normal">
      <h4 className="text-16 font-bold leading-none">{title}</h4>
      {text && (
        <Text
          markdown={text}
          className="grid gap-6 text-14 leading-6 font-normal"
        />
      )}
      {links && (
        <div className="grid content-start justify-items-start">
          {links &&
            links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-sapphire hover:underline"
              >
                {link.text}
              </Link>
            ))}
        </div>
      )}
      {children}
    </div>
  )
}

export default FooterElement
