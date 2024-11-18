import React from "react"
import TopBar from "@/components/nav-bar/top-bar"

export default function Wrapper({items}) {
  return (
    <div
      className="fixed top-8 left-0 w-topbar bg-sapphire z-50 shadow-2"
      id="navbar"
    >
      <div className="container mr-0">
        <TopBar />
      </div>
    </div>
  )
}
