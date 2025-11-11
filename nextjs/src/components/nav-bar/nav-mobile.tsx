"use client"

import React, { useEffect, useState, type Ref } from "react"
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
import useDetectScroll, { Axis } from "@smakss/react-scroll-direction"
import { Locale } from "@/lib/locale"
import { getDictionary } from "@/lib/get-dictionary.client"

type NavMobileProps = {
  navItems: NavItem[]
  logoUrl: string
  cta?: CTA
  locale: Locale
}

const NavMobile: React.FC<NavMobileProps> = ({
  navItems,
  logoUrl,
  cta,
  locale,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expand, setExpand] = useState<number | undefined>(undefined)
  const [navbarVisible, setNavbarVisible] = useState(true)

  const ref = useClickAway(() => {
    setIsOpen(false)
    setExpand(undefined)
  }) as Ref<HTMLDivElement> | undefined

  const { scrollDir, scrollPosition } = useDetectScroll({
    thr: 20,
    axis: Axis.Y,
  })

  const dictionary = getDictionary(locale)

  useEffect(() => {
    switch (true) {
      case scrollPosition.top < 20:
        setNavbarVisible(true)
        break
      case scrollDir === "up":
        setNavbarVisible(true)
        break
      case scrollDir === "down":
        setNavbarVisible(false)
        break
      default:
        break
    }
  }, [scrollDir, scrollPosition.top])

  return (
    navbarVisible && (
      <div className="fixed top-4 left-0 w-topbar bg-sapphire z-50 shadow-2">
        <div className="container mr-0">
          <div className="lg:hidden relative" ref={ref}>
            <nav className="grid grid-cols-3 justify-between h-20 px-4 ">
              <span className="relative">
                {expand === undefined && (
                  <button
                    aria-label={dictionary.ui.mobileHamburgerAriaLabel}
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx([
                      "absolute inset-0",
                      {
                        "hamburger--open": isOpen,
                        "hamburger--closed": !isOpen,
                      },
                    ])}
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
                )}
                <Transition
                  show={expand !== undefined}
                  enter="transition-all duration-150 ease-in"
                  enterFrom="scale-75"
                  enterTo="scale-100"
                  leave="transition-all duration-75"
                  leaveFrom="opacity-5"
                  leaveTo="opacity-5"
                >
                  <button
                    onClick={() => setExpand(undefined)}
                    className="w-8 pl-3 absolute inset-0"
                  >
                    <IconChevronLeft className="text-white size-5" />
                  </button>
                </Transition>
              </span>

              <Link
                href={`/${locale}`}
                className="h-20 flex items-center mx-auto"
              >
                <Image
                  className="max-h-20"
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
                  "absolute px-4 pt-4 pb-6 left-0 right-0 top-20 h-[calc(100dvh-6.75rem)] grid gap-8 content-start bg-sapphire overflow-y-auto",
                  // Shared transition styles
                  "transition ease-out -translate-y-1",
                  // Shared closed styles
                  "data-[closed]:opacity-5",
                  // Entering styles
                  "data-[enter]:duration-300 data-[enter]:data-[closed]:-translate-y-4",
                  // Leaving styles
                  "data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-y-4",
                ])}
              >
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={clsx([
                      { hidden: expand !== index && expand !== undefined },
                    ])}
                  >
                    <NavMobileItem
                      key={index}
                      item={item}
                      expand={expand === index}
                      onClick={() => setExpand(index)}
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
  )
}

export default NavMobile
