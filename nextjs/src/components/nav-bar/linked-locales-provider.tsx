"use client"

import { createContext, useContext } from "react"

export type LinkedLocale = {
  locale: string
  isActive: boolean
  href: string
}

const LinkedLocalesContext = createContext<LinkedLocale[] | undefined>(
  undefined,
)

export const useLinkedLocales = (): LinkedLocale[] => {
  const context = useContext(LinkedLocalesContext)
  if (context === undefined) {
    throw new Error(
      "useLinkedLocales must be used within LinkedLocalesProvider",
    )
  }
  return context
}

export const LinkedLocalesProvider = ({ locales, children }) => {
  const sortedLocales = locales.sort((a, b) => a.locale.localeCompare(b.locale))

  return (
    <LinkedLocalesContext.Provider value={sortedLocales}>
      {children}
    </LinkedLocalesContext.Provider>
  )
}
