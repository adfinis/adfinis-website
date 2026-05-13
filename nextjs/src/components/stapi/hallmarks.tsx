import { getHallmark } from "@/lib/strapi"
import LogoSlider from "@/components/logo-slider"

export default async function Hallmarks({
  hallmarksId,
}: {
  hallmarksId: string
}) {
  const data = await getHallmark(hallmarksId)
  if (!data || !data.hallmark) {
    return
  }

  return (
    <LogoSlider
      logos={data.hallmark.map((logo: any) => ({
        src: logo.url,
        alt: logo.alt ?? "",
      }))}
    />
  )
}
