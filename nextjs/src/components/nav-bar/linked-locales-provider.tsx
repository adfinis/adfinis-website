"use client"

import { type Locale } from "@/lib/locale"
import { createContext, ReactNode, useContext } from "react"

export type LinkedLocale = {
  locale: Locale
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

export const LinkedLocalesProvider = ({
  locales,
  children,
}: {
  locales: LinkedLocale[]
  children: ReactNode
}) => {
  const sortedLocales = locales.sort((a, b) => a.locale.localeCompare(b.locale))

  return (
    <LinkedLocalesContext.Provider value={sortedLocales}>
      {children}
    </LinkedLocalesContext.Provider>
  )
}
