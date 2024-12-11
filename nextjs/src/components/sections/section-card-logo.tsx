import React from "react"
import CardLogo from "../cards/card-logo"
import { type CTA } from "@/lib/cta"
import Text from "../text"
import ButtonGroup from "../button-group"
import Title from "../title"

interface SectionCardLogoProps {
  title: string
  description?: string
  imageUrl: string
  ctas?: CTA[]
}
const SectionCardLogo: React.FC<SectionCardLogoProps> = ({
  title,
  description,
  imageUrl,
  ctas,
}) => {
  return (
    <div className="grid gap-6 grid-cols-3 mx-auto max-w-4xl">
      <div className="col-span-1">
        <CardLogo title={title} imageUrl={imageUrl} />
      </div>
      <div className="grid gap-4 col-span-3 sm:col-span-2">
        <Title level={3} boldness={"semibold"}>
          {title}
        </Title>
        {description && <Text markdown={description} />}
        {ctas?.length && <ButtonGroup ctas={ctas} />}
      </div>
    </div>
  )
}

export default SectionCardLogo
