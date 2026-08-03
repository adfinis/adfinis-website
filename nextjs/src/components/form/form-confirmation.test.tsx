import { afterEach, expect, test, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import FormConfirmation from "./form-confirmation"

afterEach(cleanup)

const props = {
  message: "Thank you! Your response has been submitted.",
  prompt: "Need to send another?",
  link: "Click here to submit a new form.",
}

test("renders the confirmation message and submit-another link", () => {
  render(<FormConfirmation {...props} onSubmitAnother={() => {}} />)

  expect(screen.getByText(props.message)).toBeDefined()
  expect(screen.getByText(props.prompt, { exact: false })).toBeDefined()
  expect(screen.getByRole("button", { name: props.link })).toBeDefined()
})

test("calls onSubmitAnother when the link is clicked", () => {
  const onSubmitAnother = vi.fn()
  render(<FormConfirmation {...props} onSubmitAnother={onSubmitAnother} />)

  screen.getByRole("button", { name: props.link }).click()

  expect(onSubmitAnother).toHaveBeenCalledOnce()
})
