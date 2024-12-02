import React from "react"
import Triangle from "../triangle"
import Container from "../container"

type FooterProps = {
  children: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer>
      <div
        className="bg-neutral relative overflow-hidden pb-[15vh]
        before:content-[''] before:absolute
        before:left-0 before:right-0
        before:bottom-[-15vw] before:h-[15vw]
        before:z-10 before:bg-stone
        before:skew-y-6
        before:origin-bottom-right
"
      >
        <Container padding="both-padding" background="neutral">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-6 relative">
            {children}
          </div>
        </Container>
        <Triangle
          fill
          color="sapphire"
          className="z-10 w-1/2 h-auto absolute right-0 bottom-0"
        />
      </div>
    </footer>
  )
}

export default Footer
