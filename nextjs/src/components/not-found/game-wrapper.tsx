import React from "react"
import { GameCanvas } from "@/components/not-found/game-canvas"
import Container from "../container"
import Text from "../text"
import LinkButton from "../link-button"

const GameWrapper: React.FC = () => {
  return (
    <div className="bg-white">
      <GameCanvas />
      <div className="xl:hidden">
        <Container background="white">
          <Text
            markdown="Game not available on mobile devices. Please visit on a desktop device."
            className="xl:hidden mb-4"
          />
          <LinkButton href={"/"} className="xl:hidden">
            Home
          </LinkButton>
        </Container>
      </div>
    </div>
  )
}

export default GameWrapper
