"use client"

import { RefObject, useState } from "react"

/**
 * Drives the "thank you" confirmation shown after a successful submission.
 *
 * While the confirmation is visible the form fields are hidden. Calling
 * `submitAnother` brings the (empty) form back into view; a subsequent
 * successful submission re-shows the confirmation.
 *
 * `useActionState` returns a fresh `state` object on every dispatch, so we
 * remember the exact state that was dismissed. A later submission produces a
 * different object and therefore re-shows the confirmation — no effect needed.
 */
export function useFormConfirmation(
  state: { success: boolean },
  formRef: RefObject<HTMLFormElement | null>,
) {
  const [dismissedState, setDismissedState] = useState<object | null>(null)

  const showConfirmation = state.success && dismissedState !== state

  const submitAnother = () => {
    setDismissedState(state)
    formRef.current?.reset()
    // The fields only exist again after the confirmation is swapped out.
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>(
          "input:not([type='hidden']), textarea, select",
        )
        ?.focus()
    })
  }

  return { showConfirmation, submitAnother }
}
