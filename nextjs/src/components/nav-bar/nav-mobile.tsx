import React, { useState, type Ref } from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import { useClickAway } from "@uidotdev/usehooks"

import IconHamburgerMenu from "../icons/icon-hamburger-menu"
import Link from "next/link"
import ButtonLink from "../link-button"
import Logo from "../logo"
import TopbarActions from "../topbar-actions"
import type { NavItem } from "./nav"
import NavMobileItem from "./nav-mobile-item"
import IconChevronLeft from "../icons/icon-chevron-left"

type NavMobileProps = {
  navItems: NavItem[]
}

const NavMobile: React.FC<NavMobileProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expand, setExpand] = useState<number | undefined>(undefined)
  const ref = useClickAway(() => {
    setIsOpen(false)
    setExpand(undefined)
  }) as Ref<HTMLDivElement> | undefined

  return (
    <div className="lg:hidden relative" ref={ref}>
      <nav className="grid grid-cols-3 justify-between h-20 px-4 ">
        {expand === undefined ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <IconHamburgerMenu />
          </button>
        ) : (
          <button onClick={() => setExpand(undefined)}>
            <IconChevronLeft className="text-white w-6 h-6" />
          </button>
        )}
        <Link href="/theme" className="h-20 flex justify-center">
          <Logo color="biscay" variant="icon" />
        </Link>
        <TopbarActions />
      </nav>

      <Transition show={isOpen}>
        <ul
          className={clsx([
            // Base styles
            "absolute px-4 pt-4 pb-6 left-0 right-0 top-20  w-full grid bg-sapphire",
            // Shared transition styles
            "transition ease-out -translate-y-1",
            // Shared closed styles
            "data-[closed]:opacity-0",
            // Entering styles
            "data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-y-4",
            // Leaving styles
            "data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-y-4",
          ])}
        >
          {navItems.map((item, index) => (
            <li
              onClick={() => setExpand(index)}
              key={index}
              className={clsx([
                { hidden: expand !== index && expand !== undefined },
              ])}
            >
              <NavMobileItem
                key={index}
                item={item}
                expand={expand === index}
              />
            </li>
          ))}

          <li className="mt-8">
            <ButtonLink href={"/theme"} variant={"cta"}>
              Get started!
            </ButtonLink>
          </li>
        </ul>
      </Transition>
    </div>
  )
}

export default NavMobile
