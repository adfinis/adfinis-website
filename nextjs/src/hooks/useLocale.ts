import { useParams } from "next/navigation"

const getLocale = (input: unknown) => {
  if (typeof input !== "string") return "en-US"
  switch (input) {
    case "en-US":
      return "en-US"
    case "en-AU":
      return "en-AU"
    case "nl-NL":
      return "nl-NL"
    case "de-CH":
      return "de-CH"
    case "de-DE":
      return "de-DE"
    default:
      return "en-US"
  }
}

export default function useLocale() {
  const { locale } = useParams()
  return getLocale(locale)
}
