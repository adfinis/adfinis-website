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

// The real Altcha widget blocks submissions outside a secure context.
vi.mock("altcha", () => ({}))

import GatedContentForm, { type GatedContentState } from "./gated-content-form"

const dictionary = en as unknown as Dictionary
const downloadUrl = "https://cdn.example.com/white-paper.pdf"

afterEach(cleanup)

function renderForm(
  action = vi.fn(
    async (): Promise<GatedContentState> => ({ success: true, downloadUrl }),
  ),
) {
  render(
    <GatedContentForm
      intro={<p>Our white paper</p>}
      thankYou={<p>Thanks for your interest</p>}
      submitLabel="Get the white paper"
      dictionary={dictionary}
      action={action}
    />,
  )
  return action
}

test("shows the intro without exposing the download link", () => {
  renderForm()

  expect(screen.getByText("Our white paper")).toBeDefined()
  expect(screen.getByRole("button", { name: "Download" })).toBeDefined()
  expect(screen.queryByRole("link", { name: "Download" })).toBeNull()
})

test("download button fades the intro out and the form in", async () => {
  renderForm()

  fireEvent.click(screen.getByRole("button", { name: "Download" }))

  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Get the white paper" }),
    ).toBeDefined()
  })
  expect(screen.queryByText("Our white paper")).toBeNull()
})

test("submitting shows the thank you message and a reusable download link", async () => {
  const action = renderForm()

  fireEvent.click(screen.getByRole("button", { name: "Download" }))
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Get the white paper" }),
    ).toBeDefined()
  })
  fireEvent.click(screen.getByRole("button", { name: "Get the white paper" }))

  await waitFor(() => expect(action).toHaveBeenCalled())
  await waitFor(() => {
    expect(screen.getByText("Thanks for your interest")).toBeDefined()
  })
  const link = screen.getByRole("link", { name: "Download" })
  expect(link.getAttribute("href")).toBe(downloadUrl)

  // Downloading again doesn't post the form again.
  fireEvent.click(link)
  fireEvent.click(link)
  expect(action).toHaveBeenCalledTimes(1)
})

test("a failed submission keeps the form visible", async () => {
  const action = renderForm(
    vi.fn(async (): Promise<GatedContentState> => ({ success: false })),
  )

  fireEvent.click(screen.getByRole("button", { name: "Download" }))
  await waitFor(() => {
    expect(
      screen.getByRole("button", { name: "Get the white paper" }),
    ).toBeDefined()
  })
  fireEvent.click(screen.getByRole("button", { name: "Get the white paper" }))

  await waitFor(() => expect(action).toHaveBeenCalled())
  expect(
    screen.getByRole("button", { name: "Get the white paper" }),
  ).toBeDefined()
  expect(screen.queryByText("Thanks for your interest")).toBeNull()
})
