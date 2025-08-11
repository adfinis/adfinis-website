import { getHallmark } from "@/lib/strapi"
import LogoGroup from "@/components/logo-group"

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
    <LogoGroup
      columns={"auto"}
      logos={data.hallmark.map((logo: any) => ({
        src: logo.url,
        alt: logo.alt ?? "",
      }))}
    />
  )
}
