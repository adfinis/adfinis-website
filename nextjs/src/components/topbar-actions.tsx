import React from "react"
import LocaleSwitcher from "./locale-switcher"
import Search from "./search"

const TopbarActions: React.FC = () => {
  return (
    <div className="flex justify-end items-center gap-4 lg:gap-6 text-neutral">
      <Search />
      <LocaleSwitcher />
    </div>
  )
}

export default TopbarActions
