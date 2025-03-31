import { Locale } from "@/hooks/useLocale"
import Button from "./button"
import Text from "./text"
import { hasCookie, setCookieAction } from "@/app/cookie-actions"
import { COOKIE_CONSENT_KEY } from "@/lib/cookies"
import { dictionary } from "@/hooks/useDictionary"

const CookieNotice: React.FC<{ locale: Locale }> = async ({ locale }) => {
  const hasConsent = await hasCookie(COOKIE_CONSENT_KEY)
  const dict = await dictionary(locale)

  if (hasConsent) return null

  return (
    <div
      data-scheme="dark"
      className="rounded-lg p-4 w-full max-w-2xl bg-biscay grid gap-4 fixed z-50 bottom-4 right-4"
    >
      <Text className="text-14" markdown={dict.cookieBanner.text} />
      <span className="flex flex-wrap justify-between gap-4">
        {/* <Button variant={"primary"}>{personalize}</Button> */}
        <div />
        <form action={setCookieAction} className="grid grid-cols-2 gap-4">
          <Button variant={"secondary"} name="consent" value="functional">
            {dict.cookieBanner.reject}
          </Button>
          <Button variant={"cta"} type="submit" name="consent" value="all">
            {dict.cookieBanner.accept}
          </Button>
        </form>
      </span>
    </div>
  )
}

export default CookieNotice
