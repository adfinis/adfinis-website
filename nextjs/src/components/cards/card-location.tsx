import React from "react"
import { type Card } from "./card"
import Text from "../text"
import Title from "../title"

const CardLocation: React.FC<Card> = ({ description, title }) => {
  return (
    <div
      data-component="CardIcon"
      className="bg-white rounded-xl p-6 shadow-2 flex flex-col min-h-56"
    >
      <Title level={3} boldness={"semibold"} className="mb-6">
        {title}
      </Title>
      <Text markdown={description} />
    </div>
  )
}

export default CardLocation
