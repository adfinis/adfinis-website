import { expect, test } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import StandardForm from "./standard-form"

test("should render the StandardForm with basic validation", async () => {
  // act
  render(<StandardForm locale="en-US" />)

  // assert
  expect(screen.getByTestId("firstName")).toBeDefined()
  expect(screen.getByTestId("lastName")).toBeDefined()
  expect(screen.getByTestId("company")).toBeDefined()
  expect(screen.getByTestId("job")).toBeDefined()
  expect(screen.getByTestId("email")).toBeDefined()
  expect(screen.getByTestId("privacyPolicy")).toBeDefined()
  expect(screen.queryByTestId("firstName-error")).toBeNull()
  expect(screen.queryByTestId("lastName-error")).toBeNull()
  expect(screen.queryByTestId("company-error")).toBeNull()
  expect(screen.queryByTestId("job-error")).toBeNull()
  expect(screen.queryByTestId("email-error")).toBeNull()
  expect(screen.queryByTestId("privacyPolicy-error")).toBeNull()

  // act
  screen.getByTestId("standard-form-submit").click()

  // assert
  await waitFor(() => {
    expect(screen.getByTestId("firstName-error")).toBeDefined()
    expect(screen.getByTestId("lastName-error")).toBeDefined()
    expect(screen.getByTestId("company-error")).toBeDefined()
    expect(screen.getByTestId("job-error")).toBeDefined()
    expect(screen.getByTestId("email-error")).toBeDefined()
    expect(screen.getByTestId("privacyPolicy-error")).toBeDefined()
  })

  // act
  fireEvent.change(screen.getByTestId("firstName"), {
    target: { value: "John" },
  })
  fireEvent.change(screen.getByTestId("lastName"), {
    target: { value: "Doe" },
  })
  fireEvent.change(screen.getByTestId("company"), {
    target: { value: "Adfinis" },
  })
  fireEvent.change(screen.getByTestId("job"), {
    target: { value: "Developer" },
  })
  fireEvent.change(screen.getByTestId("email"), {
    target: { value: "test@adfinis.com" },
  })
  screen.getByTestId("privacyPolicy").click()

  // assert
  await waitFor(() => {
    expect(screen.queryByTestId("firstName-error")).toBeNull()
    expect(screen.queryByTestId("lastName-error")).toBeNull()
    expect(screen.queryByTestId("company-error")).toBeNull()
    expect(screen.queryByTestId("job-error")).toBeNull()
    expect(screen.queryByTestId("email-error")).toBeNull()
  })
})
