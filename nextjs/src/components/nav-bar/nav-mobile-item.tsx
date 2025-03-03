import React from "react"
import { type NavItem } from "./nav"
import IconChevronRight from "../icons/icon-chevron-right"
import clsx from "clsx"
import NavMobileSubItem from "./nav-mobile-sub-item"
import { Transition } from "@headlessui/react"
import Link from "next/link"
import IconArrowTurnDownRightIcon from "../icons/icon-arrow-turn-down-right"
import NavMobileTitle from "./nav-mobile-title"

const NavMobileItem: React.FC<{
  item: NavItem
  expand: boolean
}> = ({ item, expand }) => {
  return (
    <span data-component="NavMobileItem">
      {!expand && (
        <span className="flex justify-between items-center w-full h-12 text-neutral text-20">
          {item.title}
          <IconChevronRight
            className={clsx([
              "transition-all duration-150 h-2.5 w-auto",
              {
                "transform rotate-90": expand,
              },
            ])}
          />
        </span>
      )}
      {
        <Transition show={expand}>
          <ul
            className={clsx([
              // Base styles
              "w-full transition ease-in grid gap-2 bg-sapphire",
              // Shared closed styles
              "data-[closed]:opacity-0",
              // Entering styles
              "data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-x-4",
              // No Leaving styles
              "data-[leave]:duration-0 data-[leave]:hidden data-[leave]:data-[closed]:hidden",
            ])}
          >
            <li>
              <NavMobileTitle
                title={item.title}
                url={item.url}
                className={clsx([
                  "text-neutral font-semibold text-25",
                  "flex justify-between items-center",
                ])}
              >
                {item.title}
              </NavMobileTitle>
            </li>

            {item.menu_segment &&
              item.menu_segment.map((subItem, subIndex) => (
                <NavMobileSubItem key={subIndex} item={subItem} />
              ))}
          </ul>
        </Transition>
      }
    </span>
  )
}

export default NavMobileItem
