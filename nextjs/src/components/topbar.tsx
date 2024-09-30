"use client"
import React, { useEffect } from "react"
import NavMobile from "./nav-mobile"
import NavDesktop from "./nav-desktop"

const Topbar: React.FC = () => {
  return (
    <div>
      <div className="fixed top-8 left-0 w-topbar bg-sapphire z-50" id="navbar">
        <div className="container mr-0">
          <NavMobile />
          <NavDesktop />
        </div>
      </div>
      {/* spacer */}
      <div className="transition-all duration-150 bg-neutral min-h-80" />
    </div>
  )
}

export default Topbar
