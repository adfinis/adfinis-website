import React from "react"
import {
  LinkedLocale,
  LinkedLocalesProvider,
} from "@/components/nav-bar/linked-locales-provider"
import clsx from "clsx"
import Logo from "@/components/logo"
import ActionWrappers from "@/components/nav-bar/action-wrappers"

export default function NavBar({ items }: { items: LinkedLocale[] }) {
  return (
    <div
      className="fixed top-8 left-0 w-topbar bg-sapphire z-50 shadow-2"
      id="navbar"
    >
      <div className="container mr-0">
        <LinkedLocalesProvider locales={items}>
          <div className="hidden lg:grid  divide-y divide-jumbo/30 pr-[50px]">
            <section
              className={clsx([
                "min-h-16 h-16 py-4 transition-all duration-150 flex justify-between items-center",
                "min-h-[90px]",
              ])}
            >
              <Logo color="biscay" variant="horizontal" />
              <ActionWrappers />
            </section>
          </div>
        </LinkedLocalesProvider>
      </div>
    </div>
  )
}
