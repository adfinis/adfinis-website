import { type CTA } from "@/lib/cta"
import ExternalScript from "../external-script"
import LinkButton from "../link-button"
import IconDate from "../icons/icon-date"
import Text from "../text"
import IconTime from "../icons/icon-time"
import IconMaps from "../icons/icon-maps"
import Title from "../title"

type SectionEventProps = {
  title?: string
  date?: string
  time?: string
  location?: string
  cta?: CTA
  html?: string
}

const SectionEvent: React.FC<SectionEventProps> = ({
  title,
  date,
  time,
  location,
  cta,
  html,
}) => {
  return (
    <div className="grid gap-8">
      {title && (
        <Title align={"left"} level={3} boldness={"semibold"}>
          {title}
        </Title>
      )}
      <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
        <div className="grid gap-8 lg:gap-12 sm:justify-items-start">
          <ul className="grid gap-6 lg:gap-8">
            {date && (
              <li className="flex gap-6 items-center">
                <IconDate className="text-sunglow flex-shrink-0 self-start" />
                <Text markdown={date} />
              </li>
            )}
            {time && (
              <li className="flex gap-6 items-center">
                <IconTime className="text-sunglow flex-shrink-0 self-start" />
                <Text markdown={time} />
              </li>
            )}
            {location && (
              <li className="flex gap-6 items-center">
                <IconMaps className="text-sunglow flex-shrink-0 self-start" />
                <Text markdown={location} />
              </li>
            )}
          </ul>
          {cta && <LinkButton {...cta}>{cta.text}</LinkButton>}
        </div>

        <div className="rounded-lg overflow-hidden">
          {html && <ExternalScript html={html} />}
        </div>
      </div>
    </div>
  )
}

export default SectionEvent
