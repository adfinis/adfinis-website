import React, { useEffect } from "react"
import clsx from "clsx"
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction"
import Logo from "./logo"
import TopbarActions from "./topbar-actions"

const NavDesktop: React.FC = () => {
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
    <div
      className="hidden lg:grid  divide-y divide-jumbo/30 pr-[50px]"
      onMouseEnter={() => setMenuExpanded(true)}
      onMouseLeave={() => onMouseMenuLeave()}
    >
      <section
        className={clsx([
          "min-h-16 h-16 py-4 transition-all duration-150 flex justify-between items-center",
          {
            "min-h-[90px]": menuExpanded,
          },
        ])}
        id="nav-header"
      >
        <Logo color="biscay" variant="horizontal" />
        <TopbarActions />
      </section>
      {menuExpanded && (
        <section className="hidden lg:block min-h-12" id="nav-items"></section>
      )}
    </div>
  )
}

export default NavDesktop
