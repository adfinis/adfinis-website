"use client"

import { RefObject, useEffect } from "react"

type Values = Record<string, string | boolean | undefined> | undefined

export function useRestoreFormValues(
  formRef: RefObject<HTMLFormElement | null>,
  state: { success: boolean; values?: Values },
) {
  useEffect(() => {
    const form = formRef.current
    if (!form) {
      return
    }

    if (state.success) {
      form.reset()
      return
    }

    if (!state.values) {
      return
    }

    for (const [name, value] of Object.entries(state.values)) {
      const el = form.elements.namedItem(name)
      if (!el || el instanceof RadioNodeList) {
        continue
      }

      const field = el as HTMLInputElement | HTMLTextAreaElement
      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = Boolean(value)
      } else {
        field.value = value == null ? "" : String(value)
      }
    }
  }, [state, formRef])
}
