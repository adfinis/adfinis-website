import React from "react"
import {
  LinkedLocale,
  LinkedLocalesProvider,
} from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavDesktop from "@/components/nav-bar/nav-desktop"
import NavMobile from "@/components/nav-bar/nav-mobile"
import { Locale } from "@/lib/locale"

export default async function NavBar({ items }: { items: LinkedLocale[] }) {
  const activeLocale = items.at(-1)

  const data = await strapi(
    "navigation-menu?populate=section.menu_segment.items&populate=logo_desktop&populate=logo_mobile&populate=cta" +
      `&locale=${activeLocale?.locale}`,
  )

  return (
    <LinkedLocalesProvider locales={items}>
      <NavMobile
        navItems={data.section}
        logoUrl={data.logo_mobile.url}
        cta={data.cta}
        locale={(activeLocale?.locale || "en") as Locale}
      />
      <NavDesktop
        navItems={data.section}
        logoUrl={data.logo_desktop.url}
        cta={data.cta}
        locale={(activeLocale?.locale || "en") as Locale}
      />
    </LinkedLocalesProvider>
  )
}
