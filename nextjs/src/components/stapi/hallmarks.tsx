import strapi from "@/lib/strapi"
import LogoGroup from "@/components/logo-group"

export default async function Hallmarks({
  hallmarksId,
}: {
  hallmarksId: string
}) {
  const url = `hallmarks/${hallmarksId}?populate=hallmark`
  const { data } = await (await strapi(url)).json()
  if (!data || !data.hallmark) {
    return
  }

  return (
    <LogoGroup
      logos={data.hallmark.map((logo: any) => ({
        src: logo.url,
        alt: logo.alt,
      }))}
    />
  )
}
