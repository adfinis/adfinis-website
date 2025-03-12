"use client"

import React, { useState, type Ref } from "react"
import clsx from "clsx"
import { Transition } from "@headlessui/react"
import { useClickAway } from "@uidotdev/usehooks"
import { Sling as Hamburger } from "hamburger-react"
import Link from "next/link"
import LinkButton from "../link-button"
import type { NavItem } from "./nav"
import NavMobileItem from "./nav-mobile-item"
import IconChevronLeft from "../icons/icon-chevron-left"
import Image from "next/image"
import ActionWrappers from "@/components/nav-bar/action-wrappers"
import { CTA } from "@/lib/cta"
import { colors } from "@/lib/colors"

type NavMobileProps = {
  navItems: NavItem[]
  logoUrl: string
  cta?: CTA
}

const NavMobile: React.FC<NavMobileProps> = ({ navItems, logoUrl, cta }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expand, setExpand] = useState<number | undefined>(undefined)
  const ref = useClickAway(() => {
    setIsOpen(false)
    setExpand(undefined)
  }) as Ref<HTMLDivElement> | undefined

  return (
    <div className="fixed top-4 left-0 w-topbar bg-sapphire z-50 shadow-2">
      <div className="container mr-0">
        <div className="lg:hidden relative" ref={ref}>
          <nav className="grid grid-cols-3 justify-between h-20 px-4 ">
            {expand === undefined ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx({
                  "hamburger--open": isOpen,
                  "hamburger--closed": !isOpen,
                })}
              >
                <Hamburger
                  size={28}
                  rounded
                  toggled={isOpen}
                  color={colors.white}
                  distance="lg"
                  easing="ease-in"
                />
              </button>
            ) : (
              <button onClick={() => setExpand(undefined)}>
                <IconChevronLeft className="text-white w-6 h-6" />
              </button>
            )}
            <Link href={`/en`} className="h-20 flex justify-center">
              <Image
                src={logoUrl}
                alt={"Adfinis logo"}
                width={150}
                height={150}
              />
            </Link>
            <ActionWrappers />
          </nav>
          <Transition show={isOpen}>
            <ul
              className={clsx([
                // Base styles
                "absolute px-4 pt-4 pb-6 left-0 right-0 top-20 h-[calc(100dvh-8.25rem)] grid gap-8 content-start bg-sapphire overflow-y-auto",
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
              <li>
                {cta && (
                  <LinkButton
                    href={cta.href}
                    variant={cta.variant}
                    size={cta.size}
                  >
                    {cta.label}
                  </LinkButton>
                )}
              </li>
            </ul>
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default NavMobile
