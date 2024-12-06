import Homepage from "@/app/homepage"

export const dynamic = "force-dynamic"

export default async function Page() {
  const currentLocale = {
    href: "/",
    locale: "en",
    isActive: true,
  }
  return <Homepage activeLocale={currentLocale} />
}
