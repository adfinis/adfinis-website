import React, { useRef, useState } from "react"
import { type NavItem } from "./nav"
import clsx from "clsx"
import Link from "next/link"
import IconChevronDown from "../icons/icon-chevron-down"
import IconArrowLongRight from "../icons/icon-arrow-long-right"
import NavMobileTitle from "./nav-mobile-title"

const NavMobileSubItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <li data-component="NavMobileSubItem" className="grid text-neutral">
      {item.title && (
        <NavMobileTitle
          title={item.title}
          url={item.url}
          className={clsx([
            "font-semibold text-20 text-sunglow",
            "border-b border-neutral/20",
            "h-10",
            "flex justify-between items-center", // only for case when arrow shown
          ])}
        >
          {item.title}
        </NavMobileTitle>
      )}
      <ul className="grid">
        {item.items?.map((subItem: any, subIndex: number) => (
          <li
            key={subIndex}
            className="h-10 pl-6 flex items-center border-b border-neutral/20 last-of-type:border-b-0"
          >
            {subItem.url && (
              <Link
                href={subItem.url}
                className="flex items-center justify-between gap-2 w-full"
              >
                <span>{subItem.title}</span>
                <IconArrowLongRight className="size-4" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default NavMobileSubItem
