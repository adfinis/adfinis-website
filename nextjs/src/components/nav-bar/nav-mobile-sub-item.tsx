import React, { useRef, useState } from "react"
import { type NavItem } from "./nav"
import clsx from "clsx"
import Link from "next/link"
import IconChevronDown from "../icons/icon-chevron-down"
import { Transition } from "@headlessui/react"

const NavMobileSubItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [expand, setExpand] = useState(false)
  const toggle = () => {
    setExpand(!expand)
  }
  const contentRef = useRef<HTMLUListElement>(null)
  const handleBeforeEnter = () => {
    if (contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
    }
  }

  const handleAfterEnter = () => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto"
    }
  }

  const handleBeforeLeave = () => {
    if (contentRef.current) {
      // Set the current height explicitly for a smooth transition
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`

      // Force a reflow to ensure the transition is applied
      void contentRef.current.offsetHeight

      // Then set the height to 0
      contentRef.current.style.height = "0px"
    }
  }

  return (
    <li
      data-component="NavMobileSubItem"
      className="grid text-neutral"
      onClick={toggle}
    >
      {item.title && (
        <div className="flex justify-between items-center w-full h-9">
          <h3 className="font-semibold">{item.title}</h3>
          <IconChevronDown
            className={clsx([
              "transition-all duration-150",
              {
                "transform rotate-180": expand,
              },
            ])}
          />
        </div>
      )}
      <Transition
        show={expand}
        enter="transition-all duration-300"
        enterFrom="h-0 opacity-0"
        enterTo="h-auto opacity-100"
        leave="transition-all duration-300"
        leaveFrom="h-auto opacity-100"
        leaveTo="h-0 opacity-0"
        beforeEnter={handleBeforeEnter}
        afterEnter={handleAfterEnter}
        beforeLeave={handleBeforeLeave}
      >
        <ul
          className="grid w-full overflow-hidden ml-6"
          ref={contentRef}
          style={{ height: "0px" }}
        >
          {item.items?.map((subItem, subIndex) => (
            <li key={subIndex} className="h-9 flex items-center">
              {subItem.url && <Link href={subItem.url}>{subItem.title}</Link>}
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  )
}

export default NavMobileSubItem
