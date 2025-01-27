"use client"

import NavMobile from "./nav-bar/nav-mobile"
import NavDesktop from "./nav-bar/nav-desktop"
import { NavItem } from "./nav-bar/nav"
import { LinkedLocalesProvider } from "@/components/nav-bar/linked-locales-provider"

type TopbarProps = {
  navItems: NavItem[]
}

const Topbar: React.FC<TopbarProps> = ({ navItems }) => {
  return (
    <div
      className="fixed top-8 left-0 w-topbar bg-sapphire z-50 shadow-2"
      id="navbar"
    >
      <div className="container mr-0">
        <LinkedLocalesProvider
          locales={[
            { locale: "en", isActive: true, href: "/en/theme" },
            {
              locale: "nl",
              isActive: false,
              href: "/nl/theme",
            },
          ]}
        >
          <NavMobile
            navItems={navItems}
            logoUrl={
              "https://adfinis.com/wp-content/uploads/sites/9/2021/01/Adfinis_Quer_Black.png.webp"
            }
          />
          <NavDesktop
            navItems={navItems}
            logoUrl={
              "https://adfinis.com/wp-content/uploads/sites/9/2021/01/Adfinis_Quer_Black.png.webp"
            }
          />
        </LinkedLocalesProvider>
      </div>
    </div>
  )
}

export default Topbar
