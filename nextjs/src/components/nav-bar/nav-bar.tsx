import React from "react"
import {
  LinkedLocale,
  LinkedLocalesProvider,
} from "@/components/nav-bar/linked-locales-provider"
import { getNavigationMenu } from "@/lib/strapi"
import NavDesktop from "@/components/nav-bar/nav-desktop"
import NavMobile from "@/components/nav-bar/nav-mobile"
import { Locale } from "@/lib/locale"

export default async function NavBar({ items }: { items: LinkedLocale[] }) {
  const activeLocale = items.at(-1)
  const data = await getNavigationMenu(activeLocale?.locale ?? "en")

  return (
    <LinkedLocalesProvider locales={items}>
      <NavMobile
        navItems={data.section}
        logoUrl={data.logo_mobile.url}
        cta={data.cta}
        locale={(activeLocale?.locale.toLowerCase() || "en") as Locale}
      />
      <NavDesktop
        navItems={data.section}
        logoUrl={data.logo_desktop.url}
        cta={data.cta}
        locale={(activeLocale?.locale.toLowerCase() || "en") as Locale}
      />
    </LinkedLocalesProvider>
  )
}
