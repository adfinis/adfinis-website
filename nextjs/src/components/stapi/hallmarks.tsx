import strapi from "@/lib/strapi"
import LogoGroup from "@/components/logo-group"

export default async function Hallmarks({
  hallmarksId,
}: {
  hallmarksId: string
}) {
  const url = `hallmarks/${hallmarksId}?populate=hallmark`
  const data = await strapi(url)
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
