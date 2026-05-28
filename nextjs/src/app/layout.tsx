import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { Matomo } from "@/components/matomo/matomo"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { DEFAULT_SHARE_IMAGE, SITE_NAME } from "@/lib/metadata"
import { connection } from "next/server"
import { MatomoPixel } from "@/components/matomo/matomo-pixel"

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "block",
  variable: "--font-source-sans-3",
})

const DEFAULT_DESCRIPTION =
  "Plan innovatively. Build sustainably. Run resiliently. As open source professionals, we offer a wide range of services and solutions from a single source. Open technologies and standards are our key to innovation. Potential. Unlocked."

export const metadata: Metadata = {
  metadataBase: ABSOLUTE_URL ? new URL(ABSOLUTE_URL) : undefined,
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_SHARE_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE],
  },
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
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await connection()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adfinis AG",
    url: "https://www.adfinis.com/",
    logo: "https://adfinis-assets.ams3.cdn.digitaloceanspaces.com/public-assets/Adfinis_Blue_3_41b329491f_25f3a40e9e.png",
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`bg-neutral ${sourceSans3.variable}`}
        data-scheme="light"
      >
        <Matomo />
        {children}
        <MatomoPixel />
      </body>
    </html>
  )
}
