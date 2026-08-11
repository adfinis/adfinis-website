import { afterEach, expect, test, vi } from "vitest"
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react"
import en from "@/dictionaries/en.json"
import { type Dictionary } from "@/lib/get-dictionary.server"

// Force the server action to report a successful submission so we can exercise
// the confirmation flow without a backend.
vi.mock("@/app/actions", () => ({
  saveSimpleForm: vi.fn(async () => ({ success: true })),
}))

import Short from "./short"

const dictionary = en as unknown as Dictionary

afterEach(cleanup)

test("hides the form and shows the confirmation after a successful submit", async () => {
  render(<Short locale="en" submitLabel="Send" dictionary={dictionary} />)

  expect(screen.getByRole("button", { name: "Send" })).toBeDefined()
  expect(screen.queryByText(dictionary.forms.submitSuccessful)).toBeNull()

  fireEvent.click(screen.getByRole("button", { name: "Send" }))

  await waitFor(() => {
    expect(screen.getByText(dictionary.forms.submitSuccessful)).toBeDefined()
  })
  // The form (its submit button) is hidden.
  expect(screen.queryByRole("button", { name: "Send" })).toBeNull()
})

test("submit-another link restores the form and hides the confirmation", async () => {
  render(<Short locale="en" submitLabel="Send" dictionary={dictionary} />)

  fireEvent.click(screen.getByRole("button", { name: "Send" }))
  await waitFor(() => {
    expect(screen.getByText(dictionary.forms.submitSuccessful)).toBeDefined()
  })

  fireEvent.click(
    screen.getByRole("button", { name: dictionary.forms.submitAnotherLink }),
  )

  // Form is back, confirmation is gone.
  expect(screen.getByRole("button", { name: "Send" })).toBeDefined()
  expect(screen.queryByText(dictionary.forms.submitSuccessful)).toBeNull()
})
