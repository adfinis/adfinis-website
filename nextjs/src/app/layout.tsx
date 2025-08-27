import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "block",
  variable: "--font-source-sans-3",
})

export const metadata: Metadata = {
  title: "Adfinis",
  description:
    "Plan innovatively. Build sustainably. Run resiliently. As open source professionals, we offer a wide range of services and solutions from a single source. Open technologies and standards are our key to innovation. Potential. Unlocked.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
