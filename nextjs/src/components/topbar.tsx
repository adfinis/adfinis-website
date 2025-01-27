"use client"
import React, { useEffect } from "react"
import NavMobile from "./nav-bar/nav-mobile"
import NavDesktop from "./nav-bar/nav-desktop"
import { NavItem } from "./nav-bar/nav"

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
        <NavMobile navItems={navItems} />
        <NavDesktop navItems={navItems} />
      </div>
    </div>
  )
}

export default Topbar
