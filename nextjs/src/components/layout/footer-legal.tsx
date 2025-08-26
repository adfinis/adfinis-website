import React from "react"
import Link from "next/link"
type FooterLegalProps = {
  privacyPolicy: {
    href: string
    text: string
  }
}
const FooterLegal: React.FC<FooterLegalProps> = ({ privacyPolicy }) => (
  <span className="text-14">&copy; {new Date().getFullYear()} Adfinis.</span>
)

export default FooterLegal
