"use client"
import React, { useEffect } from "react"
import clsx from "clsx"
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction"
import NavMobile from "./nav-mobile"

const Topbar: React.FC = () => {
  const [menuExpanded, setMenuExpanded] = React.useState(true)
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
  const onMouseMenuLeave = () => {
    if (scrollPosition.top > 200) {
      setMenuExpanded(false)
    }
  }

  return (
    <div>
      <div
        className="fixed top-8 left-0 w-topbar bg-sapphire z-50"
        onMouseEnter={() => setMenuExpanded(true)}
        onMouseLeave={() => onMouseMenuLeave()}
        id="navbar"
      >
        <div className="container mr-0">
          <NavMobile />
          <div className="hidden lg:grid gap-4 divide-y divide-jumbo/30 pr-[50px]">
            <section
              className={clsx([
                "min-h-16 transition-all duration-150",
                {
                  "min-h-[90px]": menuExpanded,
                },
              ])}
              id="nav-header"
            ></section>
            {menuExpanded && (
              <section
                className="hidden lg:block min-h-12"
                id="nav-items"
              ></section>
            )}
          </div>
        </div>
      </div>
      {/* spacer */}
      <div className="transition-all duration-150 bg-neutral min-h-80" />
    </div>
  )
}

export default Topbar
