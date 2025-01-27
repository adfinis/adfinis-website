import React from "react"
import {
  LinkedLocale,
  LinkedLocalesProvider,
} from "@/components/nav-bar/linked-locales-provider"
import strapi from "@/lib/strapi"
import NavDesktop from "@/components/nav-bar/nav-desktop"
import NavMobile from "@/components/nav-bar/nav-mobile"

export default async function NavBar({ items }: { items: LinkedLocale[] }) {
  const data = await strapi(
    "navigation-menu?populate=section.menu_segment.items&populate=logo_desktop&populate=logo_mobile&populate=cta",
  )

  return (
    <div className="fixed top-8 left-0 w-topbar bg-sapphire z-50 shadow-2">
      <div className="container mr-0">
        <LinkedLocalesProvider locales={items}>
          <NavMobile
            navItems={data.section}
            logoUrl={data.logo_mobile.url}
            cta={data.cta}
          />
          <NavDesktop
            navItems={data.section}
            logoUrl={data.logo_desktop.url}
            cta={data.cta}
          />
        </LinkedLocalesProvider>
      </div>
    </div>
  )
}
