import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

const push = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}))

// jsdom lacks the ResizeObserver that Headless UI's Popover uses for anchoring.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

import ActionWrappers from "./action-wrappers"
import {
  LinkedLocalesProvider,
  type LinkedLocale,
} from "./linked-locales-provider"
import type { Locale } from "@/lib/locale"

// Mixed casing on purpose: the CMS returns "de-DE"/"de-CH"/"en-AU" at runtime
// even though the type is lowercase-only — the exact mismatch `normalize()`
// exists to absorb. The active page here is Swiss German.
const LOCALES: LinkedLocale[] = [
  { locale: "en", isActive: false, href: "/" },
  { locale: "de-DE" as Locale, isActive: false, href: "/de-de" },
  { locale: "de-CH" as Locale, isActive: true, href: "/de-ch" },
  { locale: "nl", isActive: false, href: "/nl" },
  { locale: "en-AU" as Locale, isActive: false, href: "/en-au" },
]

function renderSwitcher(locales: LinkedLocale[] = LOCALES) {
  // LinkedLocalesProvider sorts in place, so hand it fresh copies.
  render(
    <LinkedLocalesProvider locales={locales.map((l) => ({ ...l }))}>
      <ActionWrappers />
    </LinkedLocalesProvider>,
  )
}

async function openPopover() {
  fireEvent.click(screen.getByRole("button", { name: /sprache wechseln/i }))
  return (await screen.findByLabelText(
    /sprache & region/i,
  )) as HTMLSelectElement
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverStub)
  push.mockClear()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("ActionWrappers language selector", () => {
  test("renders chrome in the active page's language (Swiss German)", async () => {
    renderSwitcher()
    await openPopover()
    // Title + buttons come from the de-ch dictionary, not the browser/en.
    expect(screen.getByText("Wählen Sie Ihre Sprache")).toBeDefined()
    expect(screen.getByRole("button", { name: /bestätigen/i })).toBeDefined()
  })

  test("lists every locale as a normalized value with its endonym label", async () => {
    renderSwitcher()
    const select = await openPopover()
    const options = Array.from(select.options).map((o) => ({
      value: o.value,
      label: o.textContent,
    }))
    expect(options).toEqual([
      { value: "de-ch", label: "Deutsch (Schweiz)" },
      { value: "de-de", label: "Deutsch (Deutschland)" },
      { value: "en", label: "English (International)" },
      { value: "en-au", label: "English (Australia & New Zealand)" },
      { value: "nl", label: "Nederlands (Nederland)" },
    ])
  })

  test("defaults the dropdown to the current page's locale", async () => {
    renderSwitcher()
    const select = await openPopover()
    expect(select.value).toBe("de-ch")
  })

  test("confirm navigates to the chosen locale's href", async () => {
    renderSwitcher()
    const select = await openPopover()
    fireEvent.change(select, { target: { value: "nl" } })
    fireEvent.click(screen.getByRole("button", { name: /bestätigen/i }))
    expect(push).toHaveBeenCalledWith("/nl")
  })

  test("confirming the current locale does not navigate", async () => {
    renderSwitcher()
    await openPopover()
    // Selection is already de-ch (the active page).
    fireEvent.click(screen.getByRole("button", { name: /bestätigen/i }))
    expect(push).not.toHaveBeenCalled()
  })

  test("closes when clicking outside the selector", async () => {
    renderSwitcher()
    await openPopover()
    fireEvent.mouseDown(document.body)
    await waitFor(() =>
      expect(screen.queryByText("Wählen Sie Ihre Sprache")).toBeNull(),
    )
  })

  test("stays open when pressing inside the panel", async () => {
    renderSwitcher()
    const select = await openPopover()
    fireEvent.mouseDown(select)
    expect(screen.getByText("Wählen Sie Ihre Sprache")).toBeDefined()
  })

  test("cancel closes without navigating and discards the selection", async () => {
    renderSwitcher()
    const select = await openPopover()
    fireEvent.change(select, { target: { value: "en" } })
    fireEvent.click(screen.getByRole("button", { name: /abbrechen/i }))
    await waitFor(() =>
      expect(screen.queryByText("Wählen Sie Ihre Sprache")).toBeNull(),
    )
    expect(push).not.toHaveBeenCalled()
    const reopened = await openPopover()
    expect(reopened.value).toBe("de-ch")
  })
})
