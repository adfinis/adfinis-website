"use client"

import React, { useEffect, useState } from "react"
import clsx from "clsx"
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction"
import { NavItem } from "./nav"
import NavDesktopItems from "./nav-desktop-items"
import ActionWrappers from "@/components/nav-bar/action-wrappers"
import Image from "next/image"
import { CTA } from "@/lib/cta"
import LinkButton from "@/components/link-button"
import { useNavContext } from "./nav-context"
import Link from "next/link"
import { Locale } from "@/lib/locale"

type NavDesktopProps = {
  navItems: NavItem[]
  logoUrl: string
  cta?: CTA
  locale: Locale
}

const NavDesktop: React.FC<NavDesktopProps> = ({
  navItems,
  logoUrl,
  cta,
  locale,
}) => {
  const { setNavActive } = useNavContext()
  const [menuExpanded, setMenuExpanded] = useState(true)
  const { scrollDir, scrollPosition } = useDetectScroll({
    thr: 20,
    axis: Axis.Y,
  })

  useEffect(() => {
    switch (true) {
      case scrollPosition.top < 200:
        setMenuExpanded(true)
        break
      case scrollDir === "up":
        setMenuExpanded(true)
        break
      case scrollDir === "down":
        setMenuExpanded(false)
        setNavActive(false)
        break
      default:
        break
    }
  }, [scrollDir, scrollPosition.top, setNavActive])

  /**
   * @description only collapse the menu when the user has scrolled down
   */
  const handleMouseMenuLeave = () => {
    if (scrollPosition.top > 200) {
      setMenuExpanded(false)
    }
  }

  const handleMouseEnter = () => {
    setMenuExpanded(true)
  }

  return (
    <div
      className={clsx([
        "fixed top-0 transform transition-all duration-300 left-0 z-50 w-topbar",
        {
          "translate-y-8": scrollDir === "up" || scrollPosition.top < 10,
          "translate-y-0": scrollDir === "down",
        },
      ])}
      onMouseLeave={handleMouseMenuLeave}
    >
      <div className="bg-sapphire shadow-2">
        <div className="container mr-0">
          <div className="hidden lg:grid divide-y divide-jumbo/30 pr-[50px]">
            <section
              onMouseEnter={handleMouseEnter}
              className={clsx([
                "min-h-16 h-16 py-4 transition-all duration-150 flex justify-between items-center",
                {
                  "min-h-[90px]": menuExpanded,
                },
              ])}
              id="nav-header"
            >
              <Link href={`/${locale}`}>
                <Image
                  src={logoUrl}
                  alt={"Adfinis logo"}
                  width={160}
                  height={40}
                />{" "}
              </Link>

              <ActionWrappers />
            </section>
            {menuExpanded && (
              // The Sub-bar
              <section className="hidden lg:block" id="nav-items">
                <div className="flex justify-start items-center h-full relative">
                  {navItems.map((item, index) => (
                    <div key={index}>
                      {item && <NavDesktopItems navItem={item} />}
                    </div>
                  ))}
                  {cta && (
                    <LinkButton
                      className="ml-auto"
                      href={cta.href}
                      variant={cta.variant}
                      size={cta.size}
                    >
                      {cta.label}
                    </LinkButton>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavDesktop
