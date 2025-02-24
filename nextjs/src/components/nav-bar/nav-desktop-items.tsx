import React, { useState } from "react"
import { Transition } from "@headlessui/react"
import { useNavContext } from "./nav-context"

import type { NavItem } from "./nav"
import Link from "next/link"
import clsx from "clsx"
import useDetectScroll from "@smakss/react-scroll-direction"
import LinkAnimation from "./link-animation"

type NavDesktopItemsProps = {
  navItem: NavItem
}
const NavDesktopItems: React.FC<NavDesktopItemsProps> = ({ navItem }) => {
  const [isShowing, setIsShowing] = useState(false)
  const { navActive, setNavActive } = useNavContext()

  const showDesktopItems = () => {
    setIsShowing(true)
    setNavActive(true)
  }

  const hideDesktopItems = () => {
    setIsShowing(false)
    setNavActive(false)
  }

  const { scrollPosition } = useDetectScroll()

  return (
    <div onMouseLeave={hideDesktopItems}>
      {/* title of the menu items (always visible, in topbar) */}
      {navItem.url ? (
        <Link
          className="cursor-pointer inline-flex items-center gap-x-1 text-sm/6 font-semibold text-neutral py-4 pr-8 group"
          href={navItem.url}
          onMouseEnter={showDesktopItems}
        >
          <LinkAnimation>{navItem.title}</LinkAnimation>
        </Link>
      ) : (
        <h2
          onMouseEnter={showDesktopItems}
          className="cursor-pointer inline-flex items-center gap-x-1 text-sm/6 font-semibold text-neutral py-4 pr-8"
        >
          {navItem.title}
        </h2>
      )}

      {/* the menu items */}
      <Transition
        show={isShowing}
        enter="transition delay-150 duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="translate-y-0 opacity-100"
      >
        <div
          className={clsx([
            "absolute inset-x-0 top-14 -z-10 py-10 px-16",
            {
              "bg-stone/80 backdrop-blur-sm": scrollPosition.top > 50,
            },
          ])}
        >
          <div className="flex justify-start items-start gap-x-4 text-neutral">
            {navItem.menu_segment?.map((item, index) => (
              <div
                className="grid grid-cols-1 content-start gap-4 pr-2 border-r last-of-type:border-r-0 min-h-72 border-neutral/30 w-1/6"
                key={index}
              >
                {item.url ? (
                  <Link
                    className="text-16 leading-5 font-semibold group"
                    key={index}
                    href={item.url}
                  >
                    <LinkAnimation>{item.title}</LinkAnimation>
                  </Link>
                ) : (
                  <h3 className="text-16 leading-5 font-semibold">
                    {item.title}
                  </h3>
                )}

                {item.items?.map(
                  (subItem, subIndex) =>
                    subItem.url && (
                      <Link
                        className="font-normal group"
                        key={subIndex}
                        href={subItem.url}
                      >
                        <LinkAnimation>{subItem.title}</LinkAnimation>
                      </Link>
                    ),
                )}
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default NavDesktopItems
