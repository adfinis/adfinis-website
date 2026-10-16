"use client"

import {
  type ReactNode,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react"
import clsx from "clsx"
import Button, { buttonStyles } from "@/components/button"
import StandardFields from "@/components/dynamic-zone/forms/standard-fields"
import { useRestoreFormValues } from "@/components/form/use-restore-form-values"
import { useRedditLead } from "@/components/reddit/use-reddit-lead"
import { useLinkedInConversion } from "@/components/linkedin/use-linkedin-conversion"
import { useFadeSwap } from "@/hooks/useFadeSwap"
import { type FormState } from "@/lib/form-actions-shared"
import { type Dictionary } from "@/lib/get-dictionary.server"

export type GatedContentState = FormState & { downloadUrl?: string }

type Props = {
  intro: ReactNode
  thankYou: ReactNode
  submitLabel: string
  dictionary: Dictionary
  action: (
    state: GatedContentState,
    formData: FormData,
  ) => Promise<GatedContentState>
}

type Step = "intro" | "form" | "thank-you"

// Duration (ms) of both the fade out and the fade in.
const FADE_DURATION = 600

export default function GatedContentForm({
  intro,
  thankYou,
  submitLabel,
  dictionary,
  action,
}: Props) {
  const [state, formAction] = useActionState(action, { success: false })
  const [formOpened, setFormOpened] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useRestoreFormValues(formRef, state)
  useRedditLead(state)
  useLinkedInConversion(state)

  const step: Step = state.success ? "thank-you" : formOpened ? "form" : "intro"
  const { shown, visible } = useFadeSwap(step, FADE_DURATION)

  useEffect(() => {
    if (shown === "form" && visible) {
      formRef.current?.querySelector<HTMLInputElement>("input")?.focus()
    }
  }, [shown, visible])

  return (
    <div
      aria-live="polite"
      className={clsx(
        "w-full grid gap-4 lg:gap-8 justify-items-start transition-[opacity,transform] ease-in-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
      data-testid="gated-content"
    >
      {shown === "intro" && (
        <>
          {intro}
          <Button
            variant="cta"
            size="large"
            type="button"
            onClick={() => setFormOpened(true)}
          >
            Download
          </Button>
        </>
      )}
      {shown === "form" && (
        <form action={formAction} ref={formRef} className="w-full">
          <StandardFields
            state={state}
            submitLabel={submitLabel}
            dictionary={dictionary}
            className="grid gap-4"
          />
        </form>
      )}
      {shown === "thank-you" && (
        <>
          {thankYou}
          {state.downloadUrl && (
            <a
              className={buttonStyles({ variant: "cta", size: "large" })}
              href={state.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download
            </a>
          )}
        </>
      )}
    </div>
  )
}
