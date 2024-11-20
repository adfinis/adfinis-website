import React from "react"

type CardSliderElementProps = { children: React.ReactNode }

/**
 * @description wrapper component around any card type.
 * Will make sure element will scroll-snap to the center on mobile.
 */
const CardSliderElement: React.FC<CardSliderElementProps> = ({ children }) => (
  <div className="flex-shrink-0 snap-center">{children}</div>
)

export default CardSliderElement
