import React, { useState, type LegacyRef } from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import { useClickAway } from "@uidotdev/usehooks"

import IconHamburgerMenu from "./icons/icon-hamburger-menu"
import Link from "next/link"
import ButtonLink from "./link-button"
import IconChevronRight from "./icons/icon-chevron-right"
import Logo from "./logo"
import TopbarActions from "./topbar-actions"

const NavMobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway(() => {
    setIsOpen(false)
  }) as LegacyRef<HTMLButtonElement> | undefined

  return (
    <div className="lg:hidden relative">
      <nav className="grid grid-cols-3 justify-between h-20 px-4 ">
        <button onClick={() => setIsOpen(!isOpen)} ref={ref}>
          <IconHamburgerMenu />
        </button>
        <Link href="/theme" className="h-20 flex justify-center">
          <Logo color="biscay" variant="icon" />
        </Link>
        <TopbarActions />
      </nav>
      <Transition show={isOpen}>
        <ul
          className={clsx([
            // Base styles
            "absolute px-4 pt-4 pb-6 left-0 right-0 top-20 -translate-y-1 w-full transition ease-in-out grid bg-sapphire",
            // Shared closed styles
            "data-[closed]:opacity-0",
            // Entering styles
            "data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-y-4",
            // Leaving styles
            "data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-y-4",
          ])}
        >
          <li>
            <Link className="flex justify-between py-4" href="/theme">
              Adfinis.com
              <IconChevronRight />
            </Link>
          </li>
          <li>
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
