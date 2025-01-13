import React, { useState } from "react"
import { Transition } from "@headlessui/react"
import { useNavContext } from "./nav-context"

import type { NavItem } from "./nav"
import Link from "next/link"
import clsx from "clsx"

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

  return (
    <div className="isolate z-50 pr-8" onMouseLeave={hideDesktopItems}>
      {/* title of the menu items */}
      <div className="mx-auto max-w-7xl">
        <div
          onMouseEnter={showDesktopItems}
          className="cursor-pointer inline-flex items-center gap-x-1 text-sm/6 font-semibold text-neutral py-4"
        >
          {navItem.title}
        </div>
      </div>

      {/* menu items */}
      <Transition
        show={isShowing}
        enter="transition delay-300 duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-x-0 top-14 -z-10 py-10 px-16 bg-stone/50">
          <div className="flex justify-start items-start gap-x-4 text-neutral">
            {navItem.items?.map((item, index) => (
              <div
                className="grid grid-cols-1 content-start gap-4 pr-2 border-r last-of-type:border-r-0 min-h-72 border-neutral/30 w-1/6"
                key={index}
              >
                <h3 className="text-16 leading-5 font-semibold">
                  {item.title}
                </h3>
                {item.items?.map(
                  (subItem, subIndex) =>
                    subItem.url && (
                      <Link
                        className={clsx([
                          "font-normal",
                          "group transition-all duration-300 ease-in-out",
                        ])}
                        key={subIndex}
                        href={subItem.url}
                      >
                        <span
                          className={clsx([
                            "transition-all duration-500 ease-out",
                            "bg-gradient-to-r from-neutral/60 to-neutral",
                            "bg-left-bottom bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px]",
                          ])}
                        >
                          {subItem.title}
                        </span>
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
