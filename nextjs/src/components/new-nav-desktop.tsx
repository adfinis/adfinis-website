import clsx from "clsx"
import Logo from "@/components/logo"
import TopbarActions from "@/components/topbar-actions"
import React from "react"
import LocaleSwitcher from "@/components/locale-switcher"
import ActionWrappers from "@/components/nav-bar/action-wrappers"

export default function NewNavDesktop() {
  return (
    <div
      className="hidden lg:grid divide-y divide-jumbo/30 pr-[50px]"
      // onMouseLeave={handleMouseMenuLeave}
    >
      <section
        // onMouseEnter={handleMouseEnter}
        className={clsx([
          "min-h-16 h-16 py-4 transition-all duration-150 flex justify-between items-center",
          {
            "min-h-[90px]": false, //menuExpanded,
          },
        ])}
      >
        {/* TODO from strapi */}
        <Logo color="biscay" variant="horizontal" />
        <ActionWrappers />
      </section>
    </div>
  )
}
