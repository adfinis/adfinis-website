import React from "react"
import { GameCanvas } from "@/components/game/GameCanvas"
import Container from "../container"
import Text from "../text"
import LinkButton from "../link-button"

const GameWrapper: React.FC = () => {
  return (
    <div className="bg-white">
      <GameCanvas />
      <Text
        markdown="Game not available on mobile devices. Please visit on a desktop."
        className="xl:hidden mb-4"
      />
      <LinkButton href={"/"} className="xl:hidden">
        Home
      </LinkButton>
    </div>
  )
}

export default GameWrapper
