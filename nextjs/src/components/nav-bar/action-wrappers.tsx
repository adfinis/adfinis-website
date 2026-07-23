"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  useClose,
} from "@headlessui/react"
import { useClickAway } from "@uidotdev/usehooks"
import { useState, type ReactNode, type Ref } from "react"
import { useRouter } from "next/navigation"
import IconGlobe from "@/components/icons/icon-globe"
import IconChevronDown from "@/components/icons/icon-chevron-down"
import Button from "@/components/button"
import Text from "@/components/text"
import { useLinkedLocales } from "@/components/nav-bar/linked-locales-provider"
import { getDictionary } from "@/lib/get-dictionary.client"
import { detectLocale, type Locale } from "@/lib/locale"

// linkedLocales carries mixed casing at runtime (e.g. "de-CH" alongside "en")
const normalize = (locale: string) => locale.toLowerCase() as Locale

function CloseOnClickAway({ children }: { children: ReactNode }) {
  const close = useClose()
  const ref = useClickAway(() => close()) as Ref<HTMLDivElement>
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  )
}

export default function ActionWrappers() {
  const linkedLocales = useLinkedLocales()
  const router = useRouter()

  const activeLocale = linkedLocales.find((locale) => locale.isActive)
  const activeLocaleKey = normalize(activeLocale?.locale ?? "en")

  const { languageSelector, ui } = getDictionary(activeLocaleKey)
  const { languages } = languageSelector

  const [selectedLocale, setSelectedLocale] = useState<Locale>(activeLocaleKey)

  const [detectedLocale] = useState<Locale>(() =>
    typeof navigator === "undefined"
      ? activeLocaleKey
      : detectLocale(navigator.language, activeLocaleKey),
  )

  const confirm = (close: () => void) => {
    const target = linkedLocales.find(
      (locale) => normalize(locale.locale) === selectedLocale,
    )
    close()
    if (target && selectedLocale !== activeLocaleKey) {
      router.push(target.href)
    }
  }

  return (
    <div className="min-[432px]:relative self-center flex justify-end items-center gap-4 lg:gap-6 text-neutral">
      <Popover>
        <CloseOnClickAway>
          <PopoverButton
            aria-label={ui.localeSwitcherAriaLabel}
            className="inline-flex items-center gap-3 rounded-md py-1.5 px-3 text-14 uppercase font-semibold focus:outline-none data-[open]:bg-biscay data-[focus]:outline-1 data-[focus]:outline-neutral"
          >
            <IconGlobe />
            <span className="hidden lg:block">{activeLocaleKey}</span>
            <IconChevronDown />
          </PopoverButton>
          {/* Positioned in-flow: the `anchor` prop would portal the panel out
              of the Popover and break Escape dismissal. Below 432px (24rem card
              + margins) the card cannot reach its max width, so it is fixed and
              centered with equal screen margins; from there up it anchors flush
              right to the selector button. */}
          <PopoverPanel
            transition
            data-scheme="dark"
            className="fixed inset-x-4 top-20 mx-auto max-w-sm z-50 origin-top rounded-lg bg-biscay p-6 text-neutral transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 min-[432px]:absolute min-[432px]:inset-x-auto min-[432px]:mx-0 min-[432px]:max-w-none min-[432px]:top-full min-[432px]:right-0 min-[432px]:mt-2 min-[432px]:w-96 min-[432px]:origin-top-right"
          >
            {({ close }) => (
              <div className="grid gap-4">
                <h2 className="text-xl font-bold">{languageSelector.title}</h2>
                <Text
                  className="text-14"
                  markdown={languageSelector.detectedText.replace(
                    "${language}",
                    languages[detectedLocale],
                  )}
                />
                <div className="grid gap-2">
                  <label
                    htmlFor="language-region-select"
                    className="text-12 font-semibold uppercase tracking-wider"
                  >
                    {languageSelector.selectLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="language-region-select"
                      value={selectedLocale}
                      onChange={(event) =>
                        setSelectedLocale(event.target.value as Locale)
                      }
                      className="w-full appearance-none rounded border border-neutral/30 bg-sapphire/40 py-2.5 pl-4 pr-10 text-14 text-neutral focus:border-neutral focus:outline-none"
                    >
                      {linkedLocales.map((link) => (
                        <option
                          key={link.locale}
                          value={normalize(link.locale)}
                          className="text-stone"
                        >
                          {languages[normalize(link.locale)]}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="text"
                    onClick={() => {
                      setSelectedLocale(activeLocaleKey)
                      close()
                    }}
                    className="w-full"
                  >
                    {languageSelector.cancel}
                  </Button>
                  <Button
                    variant="cta"
                    onClick={() => confirm(close)}
                    className="w-full"
                  >
                    {languageSelector.confirm}
                  </Button>
                </div>
                <Text
                  className="text-12 text-neutral/70"
                  markdown={languageSelector.footer}
                />
              </div>
            )}
          </PopoverPanel>
        </CloseOnClickAway>
      </Popover>
    </div>
  )
}
