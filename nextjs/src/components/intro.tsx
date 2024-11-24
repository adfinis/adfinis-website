import React from "react"

type IntroProps = {
  children: React.ReactNode
}
const Intro: React.FC<IntroProps> = ({ children }) => {
  return (
    <section className="pt-12 lg:pt-6 pb-18 lg:pb-24 bg-white border-b border-[rgba(139,139,140,0.30)]">
      <div className="container max-w-4xl grid gap-8 px-4">{children}</div>
    </section>
  )
}

export default Intro
