import React from "react"
import LocaleSwitcher from "./locale-switcher"
import Search from "./search"

const TopbarActions: React.FC = () => {
  // Add your component logic here

  return (
    <div className="flex justify-end items-center gap-4 lg:gap-6">
      <Search />
      <LocaleSwitcher />
    </div>
  )
}

export default TopbarActions
