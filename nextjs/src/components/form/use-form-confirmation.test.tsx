import { expect, test, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { RefObject } from "react"
import { useFormConfirmation } from "./use-form-confirmation"

function makeFormRef(): RefObject<HTMLFormElement> {
  const form = document.createElement("form")
  form.reset = vi.fn()
  return { current: form }
}

test("hides the confirmation until a submission succeeds", () => {
  const formRef = makeFormRef()
  const { result, rerender } = renderHook(
    ({ state }) => useFormConfirmation(state, formRef),
    { initialProps: { state: { success: false } as { success: boolean } } },
  )

  expect(result.current.showConfirmation).toBe(false)

  rerender({ state: { success: true } })
  expect(result.current.showConfirmation).toBe(true)
})

test("submitAnother hides the confirmation and resets the form", () => {
  const formRef = makeFormRef()
  const { result } = renderHook(
    ({ state }) => useFormConfirmation(state, formRef),
    { initialProps: { state: { success: true } as { success: boolean } } },
  )

  expect(result.current.showConfirmation).toBe(true)

  act(() => result.current.submitAnother())

  expect(result.current.showConfirmation).toBe(false)
  expect(formRef.current!.reset).toHaveBeenCalled()
})

test("re-shows the confirmation after a new successful submission", () => {
  const formRef = makeFormRef()
  const { result, rerender } = renderHook(
    ({ state }) => useFormConfirmation(state, formRef),
    { initialProps: { state: { success: true } as { success: boolean } } },
  )

  act(() => result.current.submitAnother())
  expect(result.current.showConfirmation).toBe(false)

  // A new submission produces a fresh state object.
  rerender({ state: { success: true } })
  expect(result.current.showConfirmation).toBe(true)
})

test("moves focus to the first field after submitting another", async () => {
  const form = document.createElement("form")
  form.reset = vi.fn()
  const input = document.createElement("input")
  form.appendChild(input)
  document.body.appendChild(form)
  const formRef = { current: form } as RefObject<HTMLFormElement>

  const { result } = renderHook(() =>
    useFormConfirmation({ success: true }, formRef),
  )

  act(() => result.current.submitAnother())
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))

  expect(document.activeElement).toBe(input)
  document.body.removeChild(form)
})
