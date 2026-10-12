import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import SubmitErrorMessage from "./submit-error-message"

test("renders the message as an alert", () => {
  render(<SubmitErrorMessage message="Your message could not be sent." />)
  const alert = screen.getByRole("alert")
  expect(alert.textContent).toBe("Your message could not be sent.")
})
