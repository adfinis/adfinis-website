import type { Metadata } from "next"
import { ABSOLUTE_URL } from "@/lib/absolute-url"
import { Locale } from "@/lib/locale"

export const SITE_NAME = "Adfinis"

export const DEFAULT_SHARE_IMAGE =
  "https://adfinis-assets.ams3.cdn.digitaloceanspaces.com/public-assets/Adfinis_Blue_3_41b329491f_25f3a40e9e.png"

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "en-au": "en_AU",
  "de-ch": "de_CH",
  "de-de": "de_DE",
  nl: "nl_NL",
}

type StrapiMedia = {
  url: string
  width?: number | null
  height?: number | null
  alternativeText?: string | null
}

export type Seo = {
  share_image?: StrapiMedia | null
  og_title?: string | null
  og_description?: string | null
} | null

type StrapiMetadataInput = {
  metadata_title?: string
  metadata_description?: string
  meta_description?: string
  seo?: Seo
}

type BuildMetadataArgs = {
  data: StrapiMetadataInput
  locale: Locale
  path?: string
  type?: "website" | "article"
  languages?: Record<string, string>
  url?: string
}

export function buildMetadata({
  data,
  locale,
  path = "",
  type = "website",
  languages,
  url: urlOverride,
}: BuildMetadataArgs): Metadata {
  const seo = data.seo ?? undefined
  const title = seo?.og_title || data.metadata_title || SITE_NAME
  const description =
    seo?.og_description ||
    data.metadata_description ||
    data.meta_description ||
    ""

  const cleanPath = path.replace(/^\/+|\/+$/g, "")
  const url =
    urlOverride ??
    (cleanPath
      ? `${ABSOLUTE_URL}/${locale}/${cleanPath}`
      : `${ABSOLUTE_URL}/${locale}`)

  const shareImage = seo?.share_image
  const ogImage = shareImage?.url
    ? {
        url: shareImage.url,
        ...(shareImage.width ? { width: shareImage.width } : {}),
        ...(shareImage.height ? { height: shareImage.height } : {}),
        ...(shareImage.alternativeText
          ? { alt: shareImage.alternativeText }
          : {}),
      }
    : { url: DEFAULT_SHARE_IMAGE }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: OG_LOCALE[locale],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  }
}
