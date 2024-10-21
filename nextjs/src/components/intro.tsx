import React from "react"

type IntroProps = {
  children: React.ReactNode
}
const Intro: React.FC<IntroProps> = ({ children }) => {
  return (
    <section className="pt-12 lg:pt-6 pb-18 lg:pb-24 bg-neutral">
      <div className="container max-w-[874px] grid gap-8 px-4">{children}</div>
    </section>
  )
}

export default Intro