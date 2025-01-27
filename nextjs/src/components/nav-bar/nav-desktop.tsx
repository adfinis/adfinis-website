"use client"

import React, { useEffect, useState } from "react"
import clsx from "clsx"
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction"
import { NavItem } from "./nav"
import NavDesktopItems from "./nav-desktop-items"
import ActionWrappers from "@/components/nav-bar/action-wrappers"
import Image from "next/image"
import { CTA } from "@/components/dynamic-zone/wrapper/cta"
import LinkButton from "@/components/link-button"

type NavDesktopProps = {
  navItems: NavItem[]
  logoUrl: string
  cta?: CTA
}

const NavDesktop: React.FC<NavDesktopProps> = ({ navItems, logoUrl, cta }) => {
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
        break
      default:
        break
    }
  }, [scrollDir, scrollPosition.top])

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
      className="hidden lg:grid divide-y divide-jumbo/30 pr-[50px]"
      onMouseLeave={handleMouseMenuLeave}
    >
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
        <Image src={logoUrl} alt={"Adfinis logo"} width={160} height={40} />
        <ActionWrappers />
      </section>
      {menuExpanded && (
        // The Sub-bar
        <section className="hidden lg:block min-h-12" id="nav-items">
          <div className="flex justify-start items-center h-full relative">
            {navItems.map((item, index) => (
              <div key={index}>
                {item && <NavDesktopItems navItem={item} />}
              </div>
            ))}
          </div>
          {/* TODO Nathan */}
          <div>
            {cta && (
              <LinkButton href={cta.href} variant={cta.variant} size={cta.size}>
                {cta.label}
              </LinkButton>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default NavDesktop
