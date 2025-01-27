"use client"

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
import Image from "next/image"

type NavMobileProps = {
  navItems: NavItem[]
  logoUrl: string
}

const NavMobile: React.FC<NavMobileProps> = ({ navItems, logoUrl }) => {
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
        <Link href="/" className="h-20 flex justify-center">
          <Image src={logoUrl} alt={"Adfinis logo"} width={150} height={150} />

          <svg
            width="294"
            height="71"
            viewBox="0 0 294 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80.0196 70.0186H79.4624C76.0044 70.0186 72.5463 70.0186 69.0822 70.0247C68.7068 70.0247 68.4948 69.9268 68.301 69.5839C62.0147 58.5622 55.7103 47.5466 49.412 36.531C42.5686 24.5602 35.7252 12.5894 28.8878 0.612543C28.797 0.453341 28.7182 0.281892 28.5911 0.0369656C28.8454 0.0369656 29.015 0.0369656 29.1846 0.0369656C32.6244 0.0369656 36.0704 0.0430887 39.5102 0.0247192C39.9099 0.0247192 40.128 0.141059 40.3278 0.49008C45.1909 9.01965 50.06 17.5431 54.9352 26.0665C59.5317 34.1062 64.1283 42.1398 68.7249 50.1796C72.4252 56.6517 76.1255 63.1239 79.8197 69.5961C79.8803 69.7002 79.9227 69.8104 80.0196 70.0063V70.0186Z"
              fill="#F5F6F5"
            />
            <path
              d="M31.4496 14.9897C32.0431 16.0245 32.5821 16.9614 33.115 17.8982C34.411 20.1638 35.701 22.4293 37.003 24.6827C37.1605 24.9521 37.1484 25.1419 37.003 25.3991C32.3762 33.4755 27.7554 41.5581 23.1285 49.6407C19.3313 56.2782 15.5341 62.9157 11.7491 69.5655C11.5613 69.8961 11.3615 70.0247 10.9799 70.0186C7.52189 70.0002 4.06385 70.0063 0.599752 70.0063H-0.00585938C10.4954 51.6307 20.9483 33.3469 31.4496 14.9836V14.9897Z"
              fill="#F5F6F5"
            />
            <path
              d="M17.1389 70.0186C21.9414 61.6176 26.6773 53.3391 31.4556 44.9749C32.1944 46.2607 32.8848 47.4547 33.5691 48.6488C34.7077 50.6388 35.8341 52.6349 36.9848 54.6188C37.1604 54.9189 37.1483 55.1271 36.9787 55.4271C34.2898 60.1174 31.607 64.8078 28.9362 69.5104C28.7182 69.89 28.4881 70.0308 28.046 70.0308C24.6424 70.0063 21.2328 70.0186 17.8293 70.0186C17.6416 70.0186 17.4538 70.0186 17.151 70.0186H17.1389Z"
              fill="#F5F6F5"
            />
            <path
              d="M48.6186 45.0116C53.3787 53.333 58.1146 61.6176 62.8868 69.9635C62.699 69.988 62.5718 70.0125 62.4507 70.0125C58.9261 70.0125 55.3954 70.0125 51.8707 70.0186C51.5558 70.0186 51.3741 69.9268 51.2106 69.6451C48.4914 64.869 45.7601 60.1052 43.0469 55.3291C42.9561 55.1699 42.95 54.876 43.0348 54.7168C44.8274 51.5511 46.6382 48.3916 48.449 45.2382C48.4853 45.1769 48.5338 45.1279 48.6246 45.0116H48.6186Z"
              fill="#F5F6F5"
            />
          </svg>
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
