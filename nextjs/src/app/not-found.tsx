import { NavProvider } from "@/components/nav-bar/nav-context"
import NavBar from "@/components/nav-bar/nav-bar"
import NotFoundWrapper from "@/components/not-found/not-found-wrapper"
import { strapiWithoutRedirect } from "@/lib/strapi"
import Footer from "@/components/stapi/footer"
import { type Locale } from "@/lib/locale"

export default async function NotFound() {
  try {
    const activeLocale = {
      href: "/",
      locale: "en" as Locale,
      isActive: true,
    }
    const data = await strapiWithoutRedirect(activeLocale.locale)
    const locales = (data?.localizations ?? []).map(
      (item: { locale: Locale }) => {
        return {
          href: item.locale === "en" ? "/" : `/${item.locale.toLowerCase()}`,
          locale: item.locale,
          isActive: false,
        }
      },
    )
    locales.push(activeLocale)

    return (
      <>
        <NavProvider>
          <NavBar items={locales} />
          <NotFoundWrapper locales={locales} />
        </NavProvider>
        <Footer locale={activeLocale.locale} />
      </>
    )
  } catch (error) {
    return (
      <div className="w-screen h-screen grid place-content-center text-center text-50">
        404 Not Found
        <br />
        <a className="text-20 text-sapphire underline" href="/">
          Return home
        </a>
      </div>
    )
  }
}
