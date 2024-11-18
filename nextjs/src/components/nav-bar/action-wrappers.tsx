"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import IconGlobe from "@/components/icons/icon-globe"
import IconChevronDown from "@/components/icons/icon-chevron-down"
import Link from "next/link"

const locales = ["en-US", "en-AU", "de-CH", "de-DE", "nl-NL"]

export default function ActionWrappers() {
  const locale = "en-US"

  return (
    <div className="flex justify-end items-center gap-4 lg:gap-6 text-neutral">
      <Menu>
        <MenuButton className="inline-flex items-center gap-3 rounded-md bg-gray-800 py-1.5 px-3 text-14 uppercase font-semibold focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-stone/70 data-[focus]:outline-1 data-[focus]:outline-neutral">
          <IconGlobe />
          <span className="hidden lg:block">{locale}</span>
          <IconChevronDown />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="mt-2 z-50 w-52 origin-top-right rounded bg-gradient-to-br from-biscay to-sapphire p-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {locales.map((locale) => (
            <MenuItem key={locale}>
              <Link
                href={`/${locale}`}
                className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-neutral text-sm/6 text-neutral hover:text-biscay"
              >
                {locale}
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
