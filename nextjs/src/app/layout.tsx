import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import Logo from "@/components/logo"
import Topbar from "@/components/topbar"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "block",
  variable: "--font-source-sans-3",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
    </html>
  )
}
