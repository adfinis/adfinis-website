import { useRef } from "react"
import Button from "./button"
import Text from "./text"
import { setCookieAction } from "@/app/cookie-actions"

const CookieNotice: React.FC<{
  description: string
  reject: string
  accept: string
  personalize: string
}> = ({ description: description, reject, accept, personalize }) => {
  return (
    <div
      data-scheme="dark"
      className="rounded-lg p-4 w-full max-w-2xl bg-biscay grid gap-4 fixed z-50 bottom-4 right-4"
    >
      <Text className="text-14" markdown={description} />
      <span className="flex flex-wrap justify-between gap-4">
        <Button variant={"primary"}>{personalize}</Button>
        <form action={setCookieAction} className="grid grid-cols-2 gap-4">
          <Button variant={"secondary"} name="consent" value="none">
            {reject}
          </Button>
          <Button variant={"cta"} type="submit" name="consent" value="all">
            {accept}
          </Button>
        </form>
      </span>
    </div>
  )
}

export default CookieNotice
