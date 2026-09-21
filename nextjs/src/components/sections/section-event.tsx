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

/**
 * Escapes a number followed by "." or ")" at the start of the text, so markdown
 * renders it as plain text instead of starting a numbered list.
 *
 * German dates begin like "15. September 2026", which markdown reads as item 15
 * of a list: the "15." ends up in the margin, out of line with the time and
 * address below it.
 */
export const escapeLeadingListMarker = (text: string) =>
  text.replace(/^(\d+)([.)])/, "$1\\$2")

const SectionEvent: React.FC<SectionEventProps> = ({
  title,
  date,
  time,
  location,
  cta,
  html,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:items-center max-w-4xl mx-auto">
      <div className="grid gap-8 lg:gap-12 sm:justify-items-start">
        {title && (
          <Title align={"left"} level={3} boldness={"semibold"}>
            {title}
          </Title>
        )}
        <ul className="grid gap-6 lg:gap-8">
          {date && (
            <li className="flex gap-6 items-center">
              <IconDate className="text-sunglow flex-shrink-0 self-start" />
              <Text markdown={escapeLeadingListMarker(date)} />
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
  )
}

export default SectionEvent
