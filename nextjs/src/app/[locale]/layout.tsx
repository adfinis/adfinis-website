import { ReactNode } from "react"
import Topbar from "@/components/topbar"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      {children}
    </>
  )
}
