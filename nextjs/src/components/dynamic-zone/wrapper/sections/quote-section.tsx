import Container from "@/components/container"
import SectionGroup from "@/components/sections/section-group"
import SectionQuote from "@/components/sections/section-quote"

type Quote = {
  name: string
  tagline: string
  image?: {
    url: string
    alt: string
  }
  quote: string
}
type Props = {
  quotes: Quote[]
}
export default function QuoteSection({ section }: { section: Props }) {
  return (
    <Container background={"neutral"} padding={"both-padding"}>
      <SectionGroup hasDividers>
        {section.quotes.length > 0 && section.quotes[0] && (
          <SectionQuote
            author={`${section.quotes[0].name} | ${section.quotes[0].tagline}`}
            image={section.quotes[0].image}
            quote={section.quotes[0].quote}
          />
        )}
      </SectionGroup>
    </Container>
  )
}
