import React from "react"
import Title from "../title"
import Text from "../text"

type SectionGroupProps = {
  title?: string
  text?: string
  children: React.ReactNode
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  title,
  text,
  children,
}) => {
  return (
    <div className="grid gap-16">
      {title && (
        <Title align="center" boldness="light">
          {title}
        </Title>
      )}
      {text && (
        <div className="container max-w-[874px] grid gap-8 px-4">
          <Text markdown={text} className="text-justify lg:text-center" />
        </div>
      )}
      {children}
    </div>
  )
}

export default SectionGroup