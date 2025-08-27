import Link from "next/link"
import IconChevronLeft from "../icons/icon-chevron-left"
import IconChevronRight from "../icons/icon-chevron-right"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type PaginationProps = {
  page: number
  pageSize: number
  pageCount: number
  total: number
  locale: Locale
}

const Pagination = async ({
  page,
  pageSize,
  pageCount,
  total,
  locale,
}: PaginationProps) => {
  if (pageCount <= 1) return null

  const startNumber = (page - 1) * pageSize + 1
  const endNumber = Math.min(startNumber + pageSize - 1, total)

  const dictionary = await getDictionary(locale)

  return (
    <nav
      aria-label="Pagination"
      className="w-full flex justify-center mt-9 text-stone/75 text-14"
    >
      <ul className="flex items-center gap-4">
        <span>
          {startNumber}-{endNumber} {dictionary.common.of} {total}
        </span>

        <li>
          {page > 1 ? (
            <Link href={`?page=${page - 1}`} scroll={false}>
              <IconChevronLeft className="size-4 text-biscay" />
            </Link>
          ) : (
            <IconChevronLeft className="size-4" />
          )}
        </li>
        <li>
          {page < pageCount ? (
            <Link href={`?page=${page + 1}`} scroll={false}>
              <IconChevronRight className="size-4 text-biscay" />
            </Link>
          ) : (
            <IconChevronRight className="size-4" />
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
