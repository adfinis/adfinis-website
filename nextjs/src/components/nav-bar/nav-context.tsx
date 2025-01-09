import React, { createContext, useState, useContext, ReactNode } from "react"

type NavState = {
  navActive: boolean
  setNavActive: React.Dispatch<React.SetStateAction<boolean>>
}

const NavContext = createContext<NavState | undefined>(undefined)

/**
 * @description NavProvider is a context provider that has a single shared state about whether any desktop nav item is active or not.
 */
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [navActive, setNavActive] = useState<boolean>(false)
  return (
    <NavContext.Provider value={{ navActive, setNavActive }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error("useAppContext must be used within a NavProvider")
  }
  return context
}
