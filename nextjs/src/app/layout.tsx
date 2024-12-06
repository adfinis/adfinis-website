import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import Logo from "@/components/logo"
import Topbar from "@/components/topbar"
import Footer from "@/components/layout/footer"
import FooterElement from "@/components/layout/footer-element"

import { footer } from "./[locale]/theme/texts"
import IconSocial from "@/components/icons/icon-social"
import Link from "next/link"
import FooterLegal from "@/components/layout/footer-legal"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "block",
  variable: "--font-source-sans-3",
})

export const metadata: Metadata = {
  title: "Adfinis",
  description:
    "Plan innovatively. Build sustainably. Run resiliently. As open source professionals, we offer a wide range of services and solutions from a single source. Open technologies and standards are our key to innovation. Potential. Unlocked.",
}

/**
 *
 * @description data-scheme: We globally assume "light" as default.
 * Sections only need to specify this property (`data-scheme="dark"`) if they are dark. The variables are then overridden in `global.css`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral ${sourceSans3.variable}`}
        data-scheme="light"
      >
        {children}
        <Footer>
          {footer.columns.map((column, index) => (
            <FooterElement
              key={index}
              title={column.title}
              text={column.text}
              links={[...column.links]}
            >
              {index === 3 && (
                <div className="flex gap-6">
                  {footer.icons.map((icon, i) => (
                    <Link href={icon.href} key={i}>
                      <IconSocial type={icon.name} />
                    </Link>
                  ))}
                </div>
              )}
            </FooterElement>
          ))}
          <hr className="border-y-stone/15 col-span-1 md:col-span-2 lg:col-span-4" />
          <FooterLegal privacyPolicy={footer.privacyPolicy} />
        </Footer>
      </body>
    </html>
  )
}
